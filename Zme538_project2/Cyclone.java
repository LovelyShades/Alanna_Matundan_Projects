import java.util.Scanner;

public class Cyclone {

    static final Scanner gCONSOLE = new Scanner(System.in);
    static final int gMAX_CYCLONES = 50;
    static int[] gWindSpeed = new int[gMAX_CYCLONES];
    static int[] gDatabaseSize = new int[1];
    static int tropicalDepression = 0;
    static int tropicalStorm = 0;

    // Method to get a validated integer input within a specified range
    public static int getValidatedValue(int options, int max, String message) {
        int value;
        boolean isValid;
        do {
            isValid = true;
            System.out.print(message);
            value = gCONSOLE.nextInt();
            if (!(value >= 0 && value <= max)) {
                System.out.println("Invalid value, please, try again.");
                isValid = false;
            }
        } while (!isValid);
        return value;
    }

    // Method to initialize the database size
    public static void initializeArrays() {
        do {
            gDatabaseSize[0] = getValidatedValue(gMAX_CYCLONES, gMAX_CYCLONES,
                    "Please, enter the number of cyclones in the database (Max 50): ");
            if (gDatabaseSize[0] == 0) {
                System.out.println("Invalid value, please, try again.");
            }
        } while (gDatabaseSize[0] <= 0 || gDatabaseSize[0] > gMAX_CYCLONES);
    }

    // Method to get user input and perform corresponding actions
    public static void getUserInput() {
        int option;
        do {
            option = printMainMenu();

            switch (option) {
                case 1:
                    addUpdCyclone(); // Add or Update a cyclone
                    break;
                case 2:
                    summary(); // Generate summary
                    break;
                case 3:
                    clearDB(); // Clear the database
                    break;
                case 4:
                    showCyclones(); // Display cyclone wind speeds
                    break;
                case 5:
                    swapCyclones(); // Swap cyclones
                    break;
            }

        } while (option != 0);
    }

    // Method to display the main menu and get user's choice
    public static int printMainMenu() {
        int mainMenuInput;
        do {
            mainMenuInput = getValidatedValue(5, 5, "\nMAIN MENU: \n0 - Exit, 1 - Add/Update a cyclone, 2 - Summary, 3 - Clear Database, 4 - Show Cyclones, 5 - Swap Cyclones\nSelect an option: ");
        } while (mainMenuInput < 0 || mainMenuInput > 5);
        return mainMenuInput;
    }

    // Method to add or update a cyclone
    public static void addUpdCyclone() {
        int index;
        do {
            index = getValidatedValue(gDatabaseSize[0] - 1, gDatabaseSize[0] - 1,
                    "Enter the index (0 to " + (gDatabaseSize[0] - 1) + "): ");
        } while (index < 0 || index >= gDatabaseSize[0]);

        System.out.println("The current wind speed of the cyclone at " + index + " is: " + gWindSpeed[index]);

        int newWindSpeed;
        do {
            newWindSpeed = getValidatedValue(1000, 1000, "Enter the new wind speed (0 - 1000): ");
        } while (newWindSpeed < 0 || newWindSpeed > 1000);

        gWindSpeed[index] = newWindSpeed;
    }

    // Method to generate a summary
    public static void summary() {
        int[] category = new int[7];
        tropicalDepression = 0;
        tropicalStorm = 0;

        for (int speed : gWindSpeed) {
            if (speed > 0 && speed <= 38) {
                tropicalDepression++;
            } else if (speed >= 39 && speed <= 74) {
                tropicalStorm++;
            } else if (speed >= 75 && speed <= 95) {
                category[0]++;
            } else if (speed >= 96 && speed <= 110) {
                category[1]++;
            } else if (speed >= 111 && speed <= 129) {
                category[2]++;
            } else if (speed >= 130 && speed <= 156) {
                category[3]++;
            } else if (speed >= 157 && speed <= 1000) {
                category[4]++;
            }
        }

        System.out.println("Cyclones’ Classification Summary");
        System.out.println("Tropical Depression: " + tropicalDepression);
        System.out.println("Tropical Storm: " + tropicalStorm);
        System.out.println("Hurricane Category 1: " + category[0]);
        System.out.println("Hurricane Category 2: " + category[1]);
        System.out.println("Hurricane Category 3: " + category[2]);
        System.out.println("Hurricane Category 4: " + category[3]);
        System.out.println("Hurricane Category 5: " + category[4]);
    }

    // Method to clear the database
    public static void clearDB() {
        for (int i = 0; i < gDatabaseSize[0]; i++) {
            gWindSpeed[i] = 0;
        }
    }

    // Method to display cyclone wind speeds
    public static void showCyclones() {
        System.out.println("LIST OF Cyclones' Wind Speed");
        for (int i = 0; i < gDatabaseSize[0]; i++) {
            System.out.println("Cyclone[" + i + "]: " + gWindSpeed[i]);
        }
    }

    // Method to swap cyclones
    public static void swapCyclones() {
        int startSwap;
        int finishSwap;

        do {
            startSwap = getValidatedValue(gDatabaseSize[0] - 1, gDatabaseSize[0] - 1,
                    "Enter the position from (0 to " + (gDatabaseSize[0] - 1) + "): ");
        } while (startSwap < 0 || startSwap >= gDatabaseSize[0]);

        do {
            finishSwap = getValidatedValue(gDatabaseSize[0] - 1, gDatabaseSize[0] - 1,
                    "Enter the position to change to (0 to " + (gDatabaseSize[0] - 1) + ") that is not " + startSwap + " : ");
        } while (finishSwap == startSwap || finishSwap < 0 || finishSwap >= gDatabaseSize[0]);

        int temp = gWindSpeed[startSwap];
        gWindSpeed[startSwap] = gWindSpeed[finishSwap];
        gWindSpeed[finishSwap] = temp;
    }

    public static void main(String[] args) {
        System.out.println("Fall2023 - UTSA - CS1083 - Section 001 - Project 2 - Cyclone - written by Alanna Matundan");
        initializeArrays();
        getUserInput();
    }
}
