#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "champion.h"


Champion* createChampion() {
   Champion* newChampion = (Champion*)malloc(sizeof(Champion));
   if (newChampion) {
       // Generate a random number between 0 and 3
       int randomRole = rand() % 4;


       // Assign the role based on the random number
       switch (randomRole) {
           case 0:
               newChampion->role = MAGE;
               newChampion->level = rand() % 8 + 1; // Level between 1 and 8
               break;
           case 1:
               newChampion->role = FIGHTER;
               newChampion->level = rand() % 6 + 2; // Level between 2 and 7
               break;
           case 2:
               newChampion->role = SUPPORT;
               newChampion->level = rand() % 4 + 3; // Level between 3 and 6
               break;
           case 3:
               newChampion->role = TANK;
               newChampion->level = rand() % 4 + 6; // Level between 6 and 9
               break;
       }


       newChampion->next = NULL;
   }
   return newChampion;
}




Champion* addChampion(Champion *head, Champion *c) {
   if (!head)
       return c;
   if (c->level >= head->level) {
       c->next = head;
       return c;
   }
   Champion *current = head;
   while (current->next && c->level < current->next->level)
       current = current->next;
   c->next = current->next;
   current->next = c;
   return head;
}


Champion* buildChampionList(int n) {
   Champion* head = NULL;
   srand(time(NULL));
   for (int i = 0; i < n; i++) {
       Champion* newChampion = createChampion();
       if (newChampion)
           head = addChampion(head, newChampion);
   }
   return head;
}


void printChampionList(Champion *head) {
   while (head) {
       char roleSymbol;
       switch (head->role) {
           case MAGE:
               roleSymbol = 'M';
               break;
           case FIGHTER:
               roleSymbol = 'F';
               break;
           case SUPPORT:
               roleSymbol = 'S';
               break;
           case TANK:
               roleSymbol = 'T';
               break;
           default:
               roleSymbol = '?'; // Unknown role
       }
       printf("%c%d ", roleSymbol, head->level);
       head = head->next;
   }
   printf("\n");
}




Champion* removeChampion(Champion *head) {
   if (!head)
       return NULL;
   Champion *temp = head;
   head = head->next;
   free(temp);
   return head;
}


Champion* destroyChampionList(Champion *head) {
   while (head)
       head = removeChampion(head);
   return NULL;
}






