import { EffectDecrypting, OptionsEffect } from '../interfaces';

/**
 * La clase genera un efecto de desencriptación.
 *
 * Genera letras alfanuméricas aleatoriamente hasta alcanzar la cantidad de iteraciones indicada.
 */
class EffectDecryptingText implements EffectDecrypting {
  element: HTMLElement | null;
  letters;
  stagger;
  staggerPerLetter;

  word = 'Desarrollador FullStack React';

  constructor(selector: string, stagger = 100, staggerPerLetter = 50) {
    this.element = document.querySelector(selector);
    this.letters = this.word.split('');
    this.stagger = stagger;
    this.staggerPerLetter = staggerPerLetter;

    this.animate();
  }

  /**
   * Start the decryption animation.
   * Creates the container for each letter and inserts them.
   */
  animate() {
    if (!this.element) return;

    let encryptedText = this.element.innerText;
    let fragment = document.createDocumentFragment();

    let lettersEncryptedText = encryptedText.split('');
    this.element.innerText = '';

    this.letters.forEach((letter, index) => {
      let span = document.createElement('span');

      span.innerText = lettersEncryptedText.at(index) as string;

      fragment.appendChild(span);

      setTimeout(() => {
        this.decryptLetter({ elementLetter: span, letter });
      }, this.stagger);
    });

    this.element.appendChild(fragment);
  }

  /**
   * Assign random characters until the desired number of iterations is reached.
   * Once the number of iterations is reached, it changes the color style and assigns the correct letter.
   *
   * @param {OptionsEffect} options
   * @property {string} options.letter - Letter of the correct word.
   * @property {HTMLElement} options.elementLetter - One letter container.
   * @param {number} count - Number of iterations.
   */
  decryptLetter(options: OptionsEffect, count: number = 0) {
    if (count > 20) {
      let subtitle = document.querySelector('.introduction-subtitle');

      if (!subtitle) return;

      (subtitle as HTMLElement).style.color = '#75eff8';
      options.elementLetter.innerText = options.letter;

      return;
    }

    count++;

    setTimeout(() => {
      options.elementLetter.innerText = this.generateRandomLetter();

      this.decryptLetter(options, count);
    }, this.staggerPerLetter);
  }

  /**
   * Generates a string of random characters whose length is equal to the true string.
   */
  encryptText() {
    let encryptedText = '';

    this.letters.forEach(() => {
      let randomLetter = this.generateRandomLetter();

      encryptedText += randomLetter;
    });

    return encryptedText;
  }

  /**
   * Returns the third character of the number returned by Math.random()
   */
  generateRandomLetter() {
    return Math.random().toString(36).substring(2, 3);
  }
}

export const startDecryptingText = () => {
  const selectors = ['.introduction-subtitle'];

  selectors.forEach((selector) => new EffectDecryptingText(selector));
};
