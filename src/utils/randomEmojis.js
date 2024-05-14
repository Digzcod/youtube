function generateRandomEmoji() {
    // Array of emojis
    const emojis = ['🥶', '🐶', "🤑🤑","🥰", "🥵", '😀', '😂', '😊', '😍', '🤔', '😎', '😜', '😇', '🙌', '👍', '🎉', '🌟', '💫', '🚀', '🍕', '🍩', '🎈', '❤️', '💡', '🔥'];

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * emojis.length);

    // Return the random emoji
    return emojis[randomIndex];
}

// Function to generate dynamic number of random emojis
export function generateDynamicEmojis() {
    // Generate a random number of emojis between 2 and 5
    const numEmojis = Math.floor(Math.random() * 2) + 2;

    // Array to store generated emojis
    const generatedEmojis = [];

    // Generate numEmojis number of emojis
    for (let i = 0; i < numEmojis; i++) {
        generatedEmojis.push(generateRandomEmoji());
    }

    // Return the array of emojis
    return generatedEmojis.join("");
}