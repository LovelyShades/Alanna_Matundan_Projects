CC = gcc
CFLAGS = -Wall -Wextra -std=c99


project3Exe: main.o champion.o
	$(CC) $(CFLAGS) -o project3Exe main.o champion.o


main.o: main.c champion.h
	$(CC) $(CFLAGS) -c main.c


champion.o: champion.c champion.h
	$(CC) $(CFLAGS) -c champion.c


clean:
	 rm -f *.o project3Exe





