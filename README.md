# QB3 - DePIN pour la logistique du dernier kilomètre

**Date de début** : 24 mars 2025
**Date limite** : 6 avril 2025

## 🚀 Pitch

QB3 est un protocole visant à améliorer la compétitivité des petits commerçants en leur offrant un accès à une infrastructure logistique décentralisée. Grâce à un réseau DePIN (Decentralized Physical Infrastructure Network), des particuliers ou entreprises peuvent proposer des espaces de stockage physiques sous-utilisés, certifiés par des NFTs non transférables. Ces espaces sont regroupés en hubs virtuels pour optimiser la logistique du dernier kilomètre.

Les participants sont récompensés en tokens QB3. La gouvernance du protocole est assurée par une DAO.

---

## 🧱 Objectifs Pédagogiques (POC)

Ce projet vise à valider les compétences suivantes :

- **C1** : Rédaction d’un cahier des charges
- **C2** : Développement de smart contracts (Solidity)
- **C3** : Exploitation de jetons ERC-20 & ERC-721
- **C4** : Analyse de sécurité des smart contracts
- **C5** : Mise en place d’une CI (GitHub Actions)
- **C6** : Tests fonctionnels des smart contracts
- **C7** : Développement web (Next.js + Tailwind)
- **C8** : Déploiement sur une blockchain

---

## ⚙️ Stack Technique

- **Smart contracts** : Solidity + Hardhat
- **Frontend** : Next.js 15 + Tailwind CSS
- **Web3** : wagmi + viem + RainbowKit
- **CI** : GitHub Actions
- **Déploiement** : (à compléter selon testnet)

---

## 📁 Structure des smart contracts

- `contracts/SpaceNFT.sol` : NFT ERC-721 non transférable, utilisé pour certifier les espaces de stockage.
- `contracts/QB3Token.sol` : Token de récompense ERC-20 natif du protocole.
- `contracts/RewardManager.sol` _(optionnel)_ : Distribution automatisée des QB3 aux détenteurs de NFT.

---

## 📦 Fonctionnalités prévues

### Smart Contracts

- ✅ Mint NFT non transférable pour les fournisseurs d’espace
- ✅ Mint initial du token QB3
- ✅ Transfert de tokens entre utilisateurs
- 🕐 Distribution conditionnelle de tokens (via RewardManager)

### Frontend

- ✅ Connexion wallet (RainbowKit)
- ✅ Interface de demande d’enregistrement d’espace
- ✅ Visualisation du NFT et solde QB3
- 🕐 Interface DAO (à prototyper)

---

## 🔐 Sécurité (en réflexion)

- Autorisations de mint contrôlées
- Blocage explicite des transferts de NFT
- Vérification des bénéficiaires avant récompense
- Utilisation de SafeMath implicite via OpenZeppelin

---

## 🧪 Tests

- ✅ Unit tests des fonctions principales (mint, transfert)
- 🕐 Tests edge cases (overflow, accès non autorisé)

Commandes :

```bash
npx hardhat test
```
