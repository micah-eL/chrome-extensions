# Chrome extensions


### Censor Chrome
Censor Chrome is a Chrome extension that allows you to replace a word of your choice with the word "CENSORED".

To use:
1. Download the chrome-extension folder
2. Open the Chrome Extension Management page by navigating to chrome://extensions
3. Enable developer mode and click the Load unpacked button and select the extension directory

You'll notice there is also a folder named terminal-based in this repo.
This C program was made as an assignment for CMPT 127 and was the inspiration for making this Chrome extension.
This C program takes any number of one-word string arguments, each less than 128 characters long and censors them.

Example usage:
1. gcc censored.c -o censor
2. ./censor ringo john < beatles.txt > censored_beatles.txt

This will create a .txt file called censored_beatles that is a copy of beatles.txt except the words 'ringo' and 'john' will read 'CENSORED' instead.


### Background Color Modifier
Chrome extension that allows you to change the background color of a webpage to either red, green, or blue.

To use:
1. Download repo
2. Open the Chrome Extension Management page by navigating to chrome://extensions
3. Enable developer mode and click the Load unpacked button and select the extension directory
