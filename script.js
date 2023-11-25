document.addEventListener("DOMContentLoaded", function () {
    const defaultP = 3557;
    const defaultQ = 2579;
    const defaultE = 3;
  
    const pInput = document.getElementById("p");
    const qInput = document.getElementById("q");
    const eInput = document.getElementById("e");
    const generateKeyBtn = document.getElementById("generateKey");
  
    // Set default values for p, q, and e
    pInput.value = defaultP;
    qInput.value = defaultQ;
    eInput.value = defaultE;
  
    // Generate keys with default values
    generateKeys();
  
    generateKeyBtn.addEventListener("click", function () {
      generateKeys();
    });
  
    generateKeyBtn.addEventListener("click", function () {
      const p = parseInt(pInput.value);
      const q = parseInt(qInput.value);
      const e = parseInt(eInput.value);
  
      const keys = generateKeys(p, q, e);
  
      document.getElementById("publicKey").textContent = `(${keys.n}, ${keys.e})`;
      document.getElementById("privateKey").textContent = `(${keys.n}, ${keys.d})`;
    });
  
    document.getElementById("sign").addEventListener("click", function () {
      const message = document.getElementById("messageToSign").value;
      const privateKey = parseKey(document.getElementById("privateKey").textContent);
      const signature = sign(message, privateKey.n, privateKey.e);
  
      document.getElementById("signatureValue").textContent = signature;
    });
  
    document.getElementById("verify").addEventListener("click", function () {
      const message = document.getElementById("messageToVerify").value;
      const receivedSignature = document.getElementById("receivedSignature").value;
      const publicKey = parseKey(document.getElementById("publicKey").textContent);
      const isVerified = verify(message, receivedSignature, publicKey.n, publicKey.e);
  
      document.getElementById("verificationResult").textContent = isVerified ? "Valid" : "Invalid";
    });
  
    function parseKey(keyString) {
      const keyValues = keyString.match(/\d+/g);
      return {
        n: parseInt(keyValues[0]),
        e: parseInt(keyValues[1]),
      };
    }
  
    function generateKeys(p, q, e) {
      const n = p * q;
      const phi = (p - 1) * (q - 1);
      const d = modInverse(e, phi);
  
      return {
        n: n,
        e: e,
        d: d,
      };
    }
  
    function modInverse(a, m) {
      for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
          return x;
        }
      }
      return null;
    }
  
    function sign(message, n, d) {
      const hash = hashFunction(message); // Assume you have a hash function
      return numberCalculation(hash, n, d);
    }
  
    function verify(message, signature, n, e) {
      const hash = hashFunction(message);
      const decryptedSignature = numberCalculation(signature, n, e);
      return hash === decryptedSignature;
    }
  
    function numberCalculation(m, n, exp) {
      let result = 1;
      for (let i = 0; i < exp; i++) {
        result = (result * m) % n;
      }
      return result;
    }
  
    function hashFunction(message) {
      // Implement your hash function (e.g., convert message to ASCII and sum the values)
      let hash = 0;
      for (let i = 0; i < message.length; i++) {
        hash += message.charCodeAt(i);
      }
      return hash;
    }
  });
  