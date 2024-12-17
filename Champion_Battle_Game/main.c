#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "champion.h"


void battle(Champion **player1, Champion **player2) {


   // Retrieve the roles and levels of the champions in battle
   ChampionRole role1 = (*player1)->role;
   int level1 = (*player1)->level;
   ChampionRole role2 = (*player2)->role;
   int level2 = (*player2)->level;


   // Remove the champions used for battle
   *player1 = removeChampion(*player1);
   *player2 = removeChampion(*player2);


   // Implement battle logic based on roles and levels


   //MAGE ROLES


   if (role1 == MAGE && role2 == MAGE) {
  printf("Player 1 is a MAGE and Player 2 is a MAGE\n");
       if (level1 > level2) {
           printf("Player 1 (MAGE) wins and gains a new champion.\n");
           *player1 = addChampion(*player1, createChampion());
           printf("Player 2 (MAGE) loses one champion.\n");
           *player2 = removeChampion(*player2);
       } else if (level1 < level2) {
           printf("Player 1 (MAGE) loses one champion.\n");
           *player1 = removeChampion(*player1);
           printf("Player 2 (MAGE) wins and gains a new champion.\n");
           *player2 = addChampion(*player2, createChampion());
       } else {
           printf("It's a tie. Both players keep their champions.\n");
       }
   }


   else if (role1 == MAGE && role2 == FIGHTER) {
  printf("Player 1 is a MAGE and Player 2 is a FIGHTER\n");
           printf("Player 1 (MAGE) loses one champion.\n");
           printf("Player 2 (FIGHTER) wins and gains no reward.\n");
           *player1 = removeChampion(*player1);
       }
  


   else if (role1 == MAGE && role2 == SUPPORT){
  printf("Player 1 is a MAGE and Player 2 is a SUPPORT\n");
     if (level1 > level2) {
           printf("Player 1 (MAGE) wins and gains a new champion.\n");
           *player1 = addChampion(*player1, createChampion());
           printf("Player 2 (SUPPORT) loses two champions.\n");
           *player2 = removeChampion(*player2);
           *player2 = removeChampion(*player2);


       }


       else if (level1 < level2) {
           printf("Player 1 (MAGE) loses one champion.\n");
           printf("Player 2 (SUPPORT) wins two champions.\n");
           *player2 = addChampion(*player2, createChampion());
           *player2 = addChampion(*player2, createChampion());
           *player1 = removeChampion(*player1);
       }


       else {
           printf("It's a tie. Both players keep their champions.\n");
       }
      
   }




   else if (role1 == MAGE && role2 == TANK) {
  printf("Player 1 is a MAGE and Player 2 is a TANK\n");
       printf("Player 1 (MAGE) wins and gains a new champion.\n");
       *player1 = addChampion(*player1, createChampion());
       printf("Player 2 (TANK) loses one champion.\n");
       *player2 = removeChampion(*player2);
   }


//FIGHTER ROLES


   else if (role1 == FIGHTER && role2 == MAGE) {
  printf("Player 1 is a FIGHTER and Player 2 is a MAGE\n");
       if (level1 > level2) {
           printf("Player 1 (FIGHTER) wins and gains a new champion.\n");
           *player1 = addChampion(*player1, createChampion());
           printf("Player 2 (MAGE) loses one champion.\n");
           *player2 = removeChampion(*player2);
       } else if (level1 < level2) {
           printf("Player 1 (FIGHTER) loses one champion.\n");
           *player1 = removeChampion(*player1);
            printf("Player 2 (MAGE) wins and gains a new champion.\n");
           *player2 = addChampion(*player2, createChampion());
       } else {
           printf("It's a tie. Both players keep their champions.\n");
       }
   }


   else if (role1 == FIGHTER && role2 == FIGHTER) {
  printf("Player 1 is a FIGHTER and Player 2 is a FIGHTER\n");
       printf("Both players get a new champion added to their list.\n");
       *player1 = addChampion(*player1, createChampion());
       *player2 = addChampion(*player2, createChampion());
   }


   else if (role1 == FIGHTER && role2 == SUPPORT) {
  printf("Player 1 is a FIGHER and Player 2 is a SUPPORT\n");
       if (level1 > level2) {
           printf("Player 1 (FIGHTER) wins and gets no reward.\n");
           printf("Player 2 (SUPPORT) loses one champion.\n");
           *player2 = removeChampion(*player2);
       }
       else if (level1 < level2) {
           printf("Player 1 (FIGHTER) loses with no penalty.\n");
           printf("Player 2 (SUPPORT) wins and gets one champion.\n");
           *player2 = addChampion(*player2, createChampion());
       }
       else {
           printf("It's a tie. Both players keep their champions.\n");
       }
   }


   else if (role1 == FIGHTER && role2 == TANK) {
  printf("Player 1 is a FIGHTER and Player 2 is a TANK\n");
       printf("Player 1 (FIGHTER) wins and gets new champion.\n");
       printf("Player 2 (TANK) loses and gets no penalty.\n");
       *player1 = addChampion(*player1, createChampion());
   }


//SUPPORT ROLES


       else if (role1 == SUPPORT && role2 == MAGE){
  printf("Player 1 is a SUPPORT and Player 2 is a MAGE\n");
     if (level1 < level2) {
           printf("Player 1 (SUPPORT) loses two champions.\n");
           printf("Player 2 (MAGE) wins and gains a new champion.\n");
           *player2 = addChampion(*player2, createChampion());
           *player1 = removeChampion(*player1);
           *player1 = removeChampion(*player1);


       }
       else if (level1 > level2) {
           printf("Player 1 (SUPPORT) wins two champions.\n");
           printf("Player 2 (MAGE) loses one champion.\n");
           *player1 = addChampion(*player1, createChampion());
           *player1 = addChampion(*player1, createChampion());
           *player2 = removeChampion(*player2);
       }


       else {
           printf("It's a tie. Both players keep their champions.\n");
       }
   }




   else if (role1 == SUPPORT && role2 == FIGHTER) {
  printf("Player 1 is a SUPPORT and Player 2 is a FIGHTER\n");


       if (level1 < level2) {
           printf("Player 1 (SUPPORT) loses one champion.\n");
           printf("Player 2 (FIGHTER) wins and gets no reward.\n");
           *player1 = removeChampion(*player1);
       }


       else if (level1 > level2) {
           printf("Player 1 (SUPPORT) wins and gets one champion.\n");
           printf("Player 2 (FIGHTER) loses with no penalty.\n");
           *player1 = addChampion(*player1, createChampion());
       }


       else {
           printf("It's a tie. Both players keep their champions.\n");
       }
   }


   else if (role1 == SUPPORT && role2 == SUPPORT) {
  printf("Player 1 is a SUPPORT and Player 2 is a SUPPORT\n");
       printf("Both players lose one champion.\n");
       *player1 = removeChampion(*player1);
       *player2 = removeChampion(*player2);
   }


   else if (role1 == SUPPORT && role2 == TANK) {
  printf("Player 1 is a SUPPORT and Player 2 is a TANK\n");
       printf("Player 1 (SUPPORT) loses but gets no penalty.\n");
       printf("Player 2 (TANK) wins and gains a new champion.\n");
       *player2 = addChampion(*player2, createChampion());
   }


//TANK ROLES


   else if (role1 == TANK && role2 == MAGE) {
  printf("Player 1 is a TANK and Player 2 is a MAGE\n");
       printf("Player 1 (TANK) loses one champion.\n");
       *player1 = removeChampion(*player1);
       printf("Player 2 (MAGE) wins and gains a new champion.\n");
       *player2 = addChampion(*player2, createChampion());
   }


   else if (role1 == TANK && role2 == FIGHTER) {
  printf("Player 1 is a TANK and Player 2 is a FIGHTER\n");
       printf("Player 1 (TANK) loses and gets no penalty.\n");
       printf("Player 2 (FIGHTER) wins and gets new champion.\n");
       *player2 = addChampion(*player2, createChampion());
   }


   else if (role1 == TANK && role2 == SUPPORT) {
  printf("Player 1 is a TANK and Player 2 is a SUPPORT\n");
       printf("Player 1 (TANK) wins and gains a new champion.\n");
       *player1 = addChampion(*player1, createChampion());
        printf("Player 2 (SUPPORT) loses but gets no penalty.\n");
   }
    else if (role1 == TANK && role2 == TANK) {
  printf("Player 1 is a TANK and Player 2 is a TANK\n");
       printf("Nothing happens - no penalty or reward.\n");
   }


}




int main(int argc, char *argv[]) {
   if (argc != 2) {
       printf("Usage: %s <number of champions each player starts with>\n", argv[0]);
       return EXIT_FAILURE;
   }
   int numChampions = atoi(argv[1]);
   if (numChampions <= 0) {
       printf("Number of champions must be greater than 0.\n");
       return EXIT_FAILURE;
   }


   // Seed the random number generator
   srand(time(NULL));


   Champion *player1 = NULL;
   Champion *player2 = NULL;


   // Build champions for both players in the same loop
   int i;
  
   for (i = 0; i < 2 * numChampions; i++) {
       Champion* newChampion = createChampion();
       if (newChampion) {
           if (i % 2 == 0) // Player 1
               player1 = addChampion(player1, newChampion);
           else // Player 2
               player2 = addChampion(player2, newChampion);
       }
   }


   int round = 1;
   while (player1 && player2) {
       printf("----- ROUND %d -----\n", round);
       printf("Player 1: ");
       printChampionList(player1);
       printf("Player 2: ");
       printChampionList(player2);
       battle(&player1, &player2);
       round++;
   }


   if (!player1 && !player2)
       printf("It's a tie.\n");
   else if (!player1)
       printf("Player 2 wins.\n");
   else
       printf("Player 1 wins.\n");


   player1 = destroyChampionList(player1);
   player2 = destroyChampionList(player2);


   return EXIT_SUCCESS;
}






