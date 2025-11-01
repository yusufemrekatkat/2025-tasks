// Bu dosyada bir blockchain yapısı oluşturacağız.
// Boşlukları doldurun ve kodu çalışır hale getirin

const crypto = require("crypto");

// 1. Block sınıfını tanımla
class Block {
  // Obje yaratılırken çalışan fonksiyon
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index; // Blok numarası
    this.timestamp = timestamp; // Blok oluşturulma zamanı
    this.data = data; // Blok verileri
    this.previousHash = previousHash; // Önceki bloğun hash'i
    this.hash = this.calculateHash(); // Blok hash'i
  }

  // calculateHash() metodunu tamamlayın.
  // crypto modülünü ve SHA256 kullanarak hash oluşturun.
  calculateHash() {
    return crypto.createHash("sha256")
      .update(this.index + this.previousHash + this.timestamp + JSON.strinigfy(this.data))
      .digest("hex");
  }

// 2. Blockchain sınıfını tanımla
  class Blockchain {
   constructor() {
    // Blok zincirini başlatırken ilk blok oluşturulur
    this.chain = [this.createGenesisBlock()];
  }

  // İlk blok (Genesis Block)
  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
    // Yeni bir Block nesnesi döndürün.
    // index: 0, data: "Genesis Block", previousHash: "0"
  }

  // Son bloğu döndür
  getLatestBlock() {
    return this.chain[this.chain.length - 1]; /* zincirin son bloğunu döndür */
  }

  // 3. Yeni blok ekleme fonksiyonu
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
    // newBlock.previousHash değerini güncelleyin (son bloğun hash’i)
    // newBlock.hash değerini yeniden hesaplayın
    // zincire ekleyin
    console.log(`Blok ${newBlock.index} eklendi!`);
  }

  // Zinciri doğrulama fonksiyonu
  isChainValid() {
    for (let i=1; i<this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i-1];
      if (current.hash !== current.calculateHash()) return false
      if (current.previousHash !== previous.hash) return false
    }
    return true;
    // Tüm blokları kontrol edin:
    // Hash’ler doğru mu?
    // previousHash bir önceki bloğa eşit mi?
    // Hatalı bir durum varsa false döndürün, aksi halde true.
  }
}



// Blockchain'i test edelim
let myChain = new Blockchain();

// İki yeni blok ekleyin. Örn:
myChain.addBlock(new Block(1, Date.now(), { amount: 10, from: "Ali", to: "Veli" }));
myChain.addBlock(new Block(2, Date.now(), { amount: 20, from: "Ayşe", to: "Mehmet" }));

// Zinciri ekrana yazdır
console.log("\nBlockchain:", JSON.stringify(myChain, null, 2));

// Zinciri kontrol et
console.log("\nChain geçerli mi?", myChain.isChainValid());

// Zinciri bozmayı deneyin (isteğe bağlı)
// myChain.chain[1].data = { amount: 9999, from: "Hacker", to: "Kendisi" };
// console.log("Chain geçerli mi?", myChain.isChainValid());
myChain.chain[1].data = { amount: 999, from: "Hacker", to: "Me" };
console.log("Chain geçerli mi?", myChaib.isChainValid());
