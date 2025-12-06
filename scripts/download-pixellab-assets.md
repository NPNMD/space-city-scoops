# PixelLab Asset Download Guide

## Assets Status

### Ready to Download
1. **Shopping Cart Icon** - `e5a4885c-4f20-472d-9f00-dd5ab08e85d1`
2. **Coin Icon** - `904bdbef-a37b-41b1-a62a-6a4b04a2de5f`
3. **Warning Icon** - `65ae8964-985e-4399-9d22-9b667a6627e6`
4. **Coin Character** (ZIP) - `a8a75077-8ab9-4375-bc22-875704c95e04`
5. **Cart Character** (ZIP) - `691f8925-f9b4-468e-b313-957c230f0d39`

### Processing (Wait ~2-3 mins)
1. **Checkmark Icon** - `58e0ac62-0b37-41f3-a275-a34b608ad23e`
2. **Skull Icon** - `6e2071ce-7dd9-4fcb-99f8-d5f217a86467`
3. **Menu Icon** - `aeebec08-66c6-49e3-92b0-7a25e8fdad25`
4. **Close (X) Icon** - `a713ba27-31c0-4fc0-82db-d95fcb0cb427`
5. **Heart Icon** - `27c8258a-5aa1-4620-9d50-7a3c79a9e7a3`

## Download Commands

**Wait until all assets are ready before running these commands.**

### Icons (Isometric Tiles)
```bash
# Shopping Cart
curl --fail "https://api.pixellab.ai/mcp/isometric-tile/e5a4885c-4f20-472d-9f00-dd5ab08e85d1/download" -o public/assets/cart-icon.png

# Coin
curl --fail "https://api.pixellab.ai/mcp/isometric-tile/904bdbef-a37b-41b1-a62a-6a4b04a2de5f/download" -o public/assets/coin-icon.png

# Warning
curl --fail "https://api.pixellab.ai/mcp/isometric-tile/65ae8964-985e-4399-9d22-9b667a6627e6/download" -o public/assets/warning-icon.png

# Checkmark
curl --fail "https://api.pixellab.ai/mcp/isometric-tile/58e0ac62-0b37-41f3-a275-a34b608ad23e/download" -o public/assets/checkmark-icon.png

# Skull
curl --fail "https://api.pixellab.ai/mcp/isometric-tile/6e2071ce-7dd9-4fcb-99f8-d5f217a86467/download" -o public/assets/skull-icon.png

# Menu
curl --fail "https://api.pixellab.ai/mcp/isometric-tile/aeebec08-66c6-49e3-92b0-7a25e8fdad25/download" -o public/assets/menu-icon.png

# Close (X)
curl --fail "https://api.pixellab.ai/mcp/isometric-tile/a713ba27-31c0-4fc0-82db-d95fcb0cb427/download" -o public/assets/close-icon.png

# Heart
curl --fail "https://api.pixellab.ai/mcp/isometric-tile/27c8258a-5aa1-4620-9d50-7a3c79a9e7a3/download" -o public/assets/heart-icon.png
```

### Characters (ZIP Files)
These download as ZIP files containing multiple views. You'll need to unzip them.

```bash
# Coin Character
curl --fail "https://api.pixellab.ai/mcp/characters/a8a75077-8ab9-4375-bc22-875704c95e04/download" -o public/assets/coin-char.zip

# Cart Character
curl --fail "https://api.pixellab.ai/mcp/characters/691f8925-f9b4-468e-b313-957c230f0d39/download" -o public/assets/cart-char.zip
```
