#[allow(deprecated)]
use aes_gcm::{
    aead::{generic_array::GenericArray, Aead, KeyInit},
    Aes256Gcm,
};
use base64::{engine::general_purpose, Engine as _};
use getrandom::getrandom;
use rand::seq::SliceRandom;
use rand::thread_rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt(plaintext: &str, key_str: &str) -> String {
    let key_bytes: &[u8] = key_str.as_bytes();
    let mut key: [u8; 32] = [0u8; 32];
    for (i, &b) in key_bytes.iter().enumerate().take(32) {
        key[i] = b;
    }

    let cipher = Aes256Gcm::new(GenericArray::from_slice(&key));
    let mut nonce_bytes = [0u8; 12];
    getrandom(&mut nonce_bytes).unwrap();
    let nonce = aes_gcm::Nonce::from_slice(&nonce_bytes);
    let ciphertext: Vec<u8> = cipher.encrypt(nonce, plaintext.as_bytes()).unwrap();

    let mut combined: Vec<u8> = nonce.to_vec();
    combined.extend(ciphertext);
    general_purpose::STANDARD.encode(&combined)
}

#[wasm_bindgen]
pub fn decrypt(encoded: &str, key_str: &str) -> Result<String, String> {
    // Step 1: Base64 decode
    let combined = match general_purpose::STANDARD.decode(encoded) {
        Ok(c) => c,
        Err(_) => return Err("Failed to decode base64".to_string()),
    };

    // Step 2: Split nonce and ciphertext
    if combined.len() < 12 {
        return Err("Ciphertext too short".to_string());
    }
    let (nonce_bytes, ciphertext) = combined.split_at(12);

    // Step 3: Derive 32-byte key
    let key_bytes = key_str.as_bytes();
    let mut key = [0u8; 32];
    for (i, &b) in key_bytes.iter().enumerate().take(32) {
        key[i] = b;
    }

    // Step 4: Initialize cipher
    let cipher = Aes256Gcm::new(GenericArray::from_slice(&key));
    let nonce = GenericArray::from_slice(nonce_bytes);

    // Step 5: Attempt decryption
    let decrypted = match cipher.decrypt(nonce, ciphertext) {
        Ok(d) => d,
        Err(_) => {
            return Err("Decryption failed: wrong key or corrupted data".to_string());
        }
    };

    // Step 6: Convert to UTF-8 string
    match String::from_utf8(decrypted) {
        Ok(s) => Ok(s),
        Err(_) => Err("Failed to decode UTF-8".to_string()),
    }
}

#[wasm_bindgen]
pub fn generate_password(
    length: usize,
    use_uppercase: bool,
    use_lowercase: bool,
    use_numbers: bool,
    use_symbols: bool,
) -> String {
    const UPPERCASE: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWERCASE: &[u8] = b"abcdefghijklmnopqrstuvwxyz";
    const NUMBERS: &[u8] = b"0123456789";
    const SYMBOLS: &[u8] = b"!@#$%^&*()_+-=[]{}|;:,.<>?";

    let mut chars = Vec::new();
    if use_uppercase {
        chars.extend_from_slice(UPPERCASE);
    }
    if use_lowercase {
        chars.extend_from_slice(LOWERCASE);
    }
    if use_numbers {
        chars.extend_from_slice(NUMBERS);
    }
    if use_symbols {
        chars.extend_from_slice(SYMBOLS);
    }

    if chars.is_empty() {
        return String::from("Error: No character sets selected");
    }

    let mut rng = thread_rng();
    let password: String = (0..length)
        .map(|_| *chars.choose(&mut rng).unwrap_or(&b'a') as char)
        .collect();

    password
}

#[cfg(test)]
mod tests {
    use super::{decrypt, encrypt, generate_password};

    #[test]
    fn test_encrypt_decrypt() {
        let plaintext = "Hello, World!";
        let key = "mysecretkey12345678901234567890";
        let encrypted = encrypt(plaintext, key);
        let decrypted = decrypt(&encrypted, key).expect("Decryption should succeed");

        assert_eq!(
            plaintext, decrypted,
            "Decrypted text should match original plaintext"
        );
    }

    #[test]
    fn test_decrypt_wrong_key() {
        let plaintext = "Test message";
        let correct_key = "correctkey123456789012345678901";
        let wrong_key = "wrongkey1234567890123456789012";
        let encrypted = encrypt(plaintext, correct_key);
        let result = decrypt(&encrypted, wrong_key);

        assert!(result.is_err(), "Decryption with wrong key should fail");
        assert_eq!(
            result.unwrap_err(),
            "Decryption failed: wrong key or corrupted data",
            "Error message should match"
        );
    }

    #[test]
    fn test_decrypt_invalid_base64() {
        let key = "somekey123456789012345678901234";
        let invalid_encoded = "not valid base64!";
        let result = decrypt(invalid_encoded, key);

        assert!(
            result.is_err(),
            "Decryption with invalid base64 should fail"
        );
        assert_eq!(
            result.unwrap_err(),
            "Failed to decode base64",
            "Error message should match"
        );
    }

    #[test]
    fn test_generate_password() {
        // Test with all character sets
        let password = generate_password(12, true, true, true, true);
        assert_eq!(password.len(), 12, "Password length should be 12");
        assert!(
            password.chars().any(|c| c.is_uppercase()),
            "Password should contain uppercase letters"
        );
        assert!(
            password.chars().any(|c| c.is_lowercase()),
            "Password should contain lowercase letters"
        );
        assert!(
            password.chars().any(|c| c.is_digit(10)),
            "Password should contain numbers"
        );
        assert!(
            password
                .chars()
                .any(|c| "!@#$%^&*()_+-=[]{}|;:,.<>?".contains(c)),
            "Password should contain symbols"
        );

        // Test with only lowercase
        let password = generate_password(8, false, true, false, false);
        assert_eq!(password.len(), 8, "Password length should be 8");
        assert!(
            password.chars().all(|c| c.is_lowercase()),
            "Password should only contain lowercase letters"
        );

        // Test with no character sets selected
        let password = generate_password(10, false, false, false, false);
        assert_eq!(
            password, "Error: No character sets selected",
            "Should return error message when no character sets are selected"
        );
    }

    #[test]
    fn test_generate_password_length() {
        let lengths: [usize; 4] = [0, 5, 10, 20];
        for &length in &lengths {
            let password = generate_password(length, true, true, true, true);
            assert_eq!(
                password.len(),
                if length == 0 { 0 } else { length },
                "Password length should match requested length"
            );
        }
    }
}
