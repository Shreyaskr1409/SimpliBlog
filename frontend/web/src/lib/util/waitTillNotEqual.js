export function waitUntilNotEqual(valueGetter, targetValue) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const currentValue = valueGetter(); // Get the current value
        if (currentValue !== targetValue) {
          clearInterval(interval);
          resolve(currentValue); // Resolve with the current value when it's not equal to the target
        }
      }, 100); // Check every 100ms
    });
}