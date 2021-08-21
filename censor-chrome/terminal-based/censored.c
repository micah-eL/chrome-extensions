#include <stdlib.h>
#include<stdio.h>
#include <string.h>
#include <stdbool.h>

int main (int argc, char* argv[]){
	char word[128];
	int index = 0;
    bool found = false;
	int c = getchar(); // Get first char of inputed .txt file or terminal input

	while (c != EOF){
	  	
		if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c == '\'')){ //If we are reading in a word
			if (index < 127){ // If the max char count for a word has not been reached (Note: <127 not <128 because word[127] = \0)
				word[index] = (char)c; // Typecast current char to char (c is declared as an int)
				index++;
                word[index] = '\0'; // Set char after the current last letter of word to null
			}
            else{
                word[index] = '\0';
            }
		}
		else{ //If we are not reading in a word
			if (index > 0){ //If the index > 0, that means we just finished reading a word
				
				found = false;
				for(int i = 1; i < argc; i++){
                    if (strcmp(word, argv[i]) == 0){ //If we match with one of the words to censor, print CENSORED
                        printf ("CENSORED");
                        found = true;
                        break;
                    }
				}
				if (found != true){
					printf ("%s", word);
				}
			}
			//Reset current word and index and print whatever was just read (could be any of . , ; ? ! 'whitespace' etc.)
            word[0] = '\0';
			index = 0;
			printf ("%c", (char)c);
		}

		c = getchar();

	}
}
