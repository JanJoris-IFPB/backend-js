import CryptoJS from "crypto-js";

export default class CryptographyComponent {

    /**
     * Encrypts the specified string using the AES algorithm using the specified key and returns the encrypted result.
     * @param string the string to encrypt
     * @param key the key to encrypt the string with
     * @returns the encrypted string
     */
    public static encrypt(string: string, key: string): string {
        return CryptoJS.AES.encrypt(string, key).toString();
    }

    /**
     * Decrypts the specified string using the specified key and returns the plain string.
     * The decryption key must be the same one used to encrypt the string.
     * @param string the string to decrypt
     * @param key the key used to encrypt the string
     * @returns the decrypted string
     */
    public static decrypt(string: string, key: string): string {
        const bytes = CryptoJS.AES.decrypt(string, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

}
