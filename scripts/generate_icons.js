const fs = require('fs');
const zlib = require('zlib');

function createSolidPng(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(2, 9); // color type (RGB)
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(8 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    // crc
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeInt32BE(crc, 8 + len);
    return buf;
  }

  // Scanlines: width * 3 bytes + 1 filter byte per line
  const rawData = Buffer.alloc(height * (1 + width * 3));
  let pos = 0;
  for (let y = 0; y < height; y++) {
    rawData[pos++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      // Border or background
      const isBorder = (x < 16 || x > width - 16 || y < 16 || y > height - 16);
      if (isBorder) {
        rawData[pos++] = 255; // Coral red
        rawData[pos++] = 94;
        rawData[pos++] = 58;
      } else {
        rawData[pos++] = r;
        rawData[pos++] = g;
        rawData[pos++] = b;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Simple CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) | 0;
}

const icon192 = createSolidPng(192, 192, 38, 28, 25);
fs.writeFileSync('public/icon-192.png', icon192);

const icon512 = createSolidPng(512, 512, 38, 28, 25);
fs.writeFileSync('public/icon-512.png', icon512);

console.log('Generated icon-192.png and icon-512.png successfully!');
