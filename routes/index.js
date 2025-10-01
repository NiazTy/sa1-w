import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const messages = [
    '💖 SUBARU AWA IS MY WIFE! 💖',
    '🚀 Welcome to the Subaru Awa fan club! 🚀',
    '🌟 Have a great day! 🌟'
  ];

  // Pilih pesan acak tiap reload
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  res.send(`
    <html>
      <head>
        <title>Subaru Awa Fan Club</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
            text-align: center;
            animation: fadeIn 2s;
          }
          h1 {
            font-size: 3rem;
            animation: bounce 2s infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        </style>
      </head>
      <body>
        <h1>${randomMessage}</h1>
      </body>
    </html>
  `);
});

export default router;
