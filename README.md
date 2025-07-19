# 🐍 SNAK.EXE
(Under construction)

A retro-style Snake game with classic black and white arcade aesthetics, built with HTML5 Canvas and JavaScript.

![SNAKexe Preview](https://img.shields.io/badge/Game-SNAKexe-green?style=for-the-badge&logo=snake)

## 🎮 Game Features

- **Retro Aesthetic**: Classic black and white terminal-style graphics
- **Smooth Gameplay**: Responsive controls with arrow keys or WASD
- **Score Tracking**: Persistent high score saved locally
- **Mobile Support**: Touch controls for mobile devices
- **Pixel Perfect**: Crisp, pixelated graphics for authentic retro feel
- **Particle Effects**: Retro-style white square particles when eating food

## 🕹️ Controls

- **Arrow Keys** or **WASD** to move the snake
- **Mobile**: Use the on-screen directional buttons
- Eat the blinking white food blocks to grow and score points
- Avoid hitting walls or your own tail

## 🖥️ Visual Style

- **Monospace Font**: Courier New for that classic computer terminal feel
- **Color Palette**: Pure black background with white and green elements
- **Animations**: Blinking text effects and smooth transitions
- **Grid System**: Visible grid lines for classic game board appearance

## 🚀 How to Play

1. Open `index.html` in your web browser
2. Click "START GAME" 
3. Use arrow keys or WASD to control the snake
4. Eat the white food blocks to grow and increase your score
5. Try to beat your high score!

## 📁 Project Structure

```
SNAKexe/
├── index.html      # Main game HTML file
├── styles.css      # Retro styling and animations
├── script.js       # Game logic and canvas rendering
└── README.md       # This file
```

## 🛠️ Technical Details

- **Pure JavaScript**: No external libraries or frameworks
- **HTML5 Canvas**: For pixel-perfect game rendering
- **CSS3**: Custom animations and retro styling
- **Local Storage**: Persistent high score tracking
- **Responsive Design**: Works on desktop and mobile devices

## 🎯 Game Mechanics

- Snake grows by one segment for each food eaten
- Score increases by 10 points per food item
- Game ends when snake hits walls or itself
- High score persists between sessions

## 🎨 Customization

The game can be easily customized by modifying:

- **Speed**: Change the interval in `setInterval(this.update, 150)` in `script.js`
- **Colors**: Modify color values in `styles.css`
- **Grid Size**: Adjust `this.gridSize = 20` in `script.js`
- **Canvas Size**: Change width/height attributes in `index.html`

## 🌟 Features to Add

- Sound effects for eating food and game over
- Different difficulty levels
- Power-ups and special food items
- Multiplayer mode
- Theme variations
- Leaderboard system

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers with HTML5 Canvas support

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for retro gaming enthusiasts**

*Experience the nostalgia of classic arcade games right in your browser!*
