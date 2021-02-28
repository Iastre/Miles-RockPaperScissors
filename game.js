const computerOptions = ["rock", "paper", "scissors"];

// Obtains, trims and validates user's input. Will ONLY ever return "rock", "paper", "scissors" or "exit".
function getPlayerInput()
{
    let result = prompt("Please enter \"rock\", \"paper\" or \"scissors\".");
    if (result != null)
    {
        result = result.trim().toLowerCase();
    }
    else
    {
        // Set and used internally to handle the user selecting "Cancel" - though the user can also type "exit" to exit the game as well.
        result = "exit";
    }
    // If the player did not select a valid option, keep prompting until they do.
    while ((result != "rock") && (result != "paper") && (result != "scissors") && (result != "exit"))
    {
        result = prompt("Please ONLY enter \"rock\", \"paper\" or \"scissors\"!");
        if (result != null)
        {
            result = result.trim().toLowerCase();
        }
        else
        {
            result = "exit";
        }
    }
    return result;
}

// Returns an int representing the outcome - 0 for a tie, 1 for a computer win and 2 for a player win.
function calculateOutcome(playerChoice, computerChoice)
{
    switch(playerChoice)
    {
        case "scissors":
            switch(computerChoice)
            {
                default:
                case 0: // Rock
                    return 1;
                    break;
                case 1: // Paper
                    return 2;
                    break;
                case 2: // Scissors
                    return 0;
                    break;
            }
            break;
        case "paper":
            switch(computerChoice)
            {
                default:
                case 0: // Rock
                    return 2;
                    break;
                case 1: // Paper
                    return 0;
                    break;
                case 2: // Scissors
                    return 1;
                    break;
            }
            break;
        default: // There shouldn't ever be a call for this with the validation done in the getPlayerInput() function, but just to be safe treat unknown values as "rock".
        case "rock":
            switch(computerChoice)
            {
                default:
                case 0: // Rock
                    return 0;
                    break;
                case 1: // Paper
                    return 1;
                    break;
                case 2: // Scissors
                    return 2;
                    break;
            }
            break;
    }
    return 0; // With default cases in the switch statements this should never trigger - but just in case, return an explicit default value (tie).
}

function playGame()
{
    // Get the number of rounds.
    let numGames = -1;
    let input = prompt("How many rounds would you like to play?");
    if (input == null)
    {
        // RETURN CASE: If the player selected "Cancel", exit the game gracefully.
        console.log("Exiting game.");
        return;
    }
    numGames = parseInt(input);
    // If the player entered a negative or zero value or no number at all, keep prompting until they enter a valid number.
    while ((numGames < 1) || isNaN(numGames))
    {
        input = prompt("Please enter a numerical value greater than 0!\n\nHow many rounds would you like to play?");
        if (input == null)
        {
            // RETURN CASE: If the player selected "Cancel", exit the game gracefully.
            console.log("Exiting game.");
            return;
        }
        numGames = parseInt(input);
    }
    // Initialize the scoreboard.
    let playerWins = 0;
    let computerWins = 0;
    let ties = 0;

    for (i = 1; i <= numGames; i++)
    {
        // Display the round information.
        console.log("Round " + i + ":\nYou\t\tTie\t\tAI\n" + playerWins + "\t\t" + ties + "\t\t" + computerWins);
        // Calculate the computer's selection.
        let computerChoice = Math.floor(Math.random() * 3);
        // Obtain the player's selection.
        let playerInput = getPlayerInput();
        if (playerInput == "exit")
        {
            // BREAK CASE: If the user selects "Cancel" (or types "exit"), the game will skip to the exit gracefully.
            console.log("Exiting game.");
            break;
        }
        // Calculate the outcome.
        let outcome = calculateOutcome(playerInput, computerChoice);
        console.log(playerInput + "\t\tvs.\t\t" + computerOptions[computerChoice]);
        switch(outcome)
        {
            default:
            case 0: // Tie
                ties++;
                console.log("Tie!\n\n");
                break;
            case 1: // Computer wins
                computerWins++;
                console.log("Computer wins!\n\n");
                break;
            case 2: // Player wins
                playerWins++;
                console.log("Player wins!\n\n");
                break;
        }
   }
   
    // Display the final round and the results:
    console.log("Final result:\nYou\t\tTie\t\tAI\n" + playerWins + "\t\t" + ties + "\t\t" + computerWins);
    if (playerWins > computerWins)
    {
        console.log("\nPlayer wins!");
    }
    else if (computerWins > playerWins)
    {
        console.log("\nComputer wins!");
    }
    else
    {
        console.log("\nGame was a tie!");
    }
}