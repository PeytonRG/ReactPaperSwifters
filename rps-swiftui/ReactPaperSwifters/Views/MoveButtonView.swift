//
//  MoveButtonView.swift
//  ReactPaperSwifters
//
//  Created by Peyton Gasink on 12/6/22.
//

import SwiftUI

struct MoveButtonView: View {
    @ObservedObject var scores: Scores
    
    @State private var alertTitle = ""
    @State private var alertMessage = ""
    @State private var showingResultAlert = false
    
    let icon: String
    let move: Move
    
    var body: some View {
        Button(icon) {
            pickMove(move: move)
        }
        .font(.largeTitle)
        .padding()
        .background(.blue)
        .clipShape(Circle())
        .alert(alertTitle, isPresented: $showingResultAlert) {
            Button("OK") { }
        } message: {
            Text(alertMessage)
        }
    }
    
    func incrementPlayerScore(player: Player) -> Void {
        if player == .user {
            scores.userScore += 1
        } else {
            scores.computerScore += 1
        }
    }
    
    func calculateComputerMove() -> Move {
        return Move.allCases.randomElement()!
    }
    
    func pickMove(move: Move) -> Void {
        let computerMove = calculateComputerMove()
        
        var result: Result
        
        if move == computerMove {
            result = .tie
        } else {
            switch computerMove {
            case .rock:
                if move == .paper {
                    incrementPlayerScore(player: .user)
                    result = .win
                } else {
                    incrementPlayerScore(player: .computer)
                    result = .loss
                }
            case .paper:
                if move == .scissors {
                    incrementPlayerScore(player: .user)
                    result = .win
                } else {
                    incrementPlayerScore(player: .computer)
                    result = .loss
                }
            case .scissors:
                if move == .rock {
                    incrementPlayerScore(player: .user)
                    result = .win
                } else {
                    incrementPlayerScore(player: .computer)
                    result = .loss
                }
            }
        }
        
        alertTitle = getResultString(result: result)
        alertMessage = "The computer picked \(computerMove)."
        showingResultAlert = true
    }
    
    func getResultString(result: Result) -> String {
        switch result {
        case .win:
            return "You won!"
        case .loss:
            return "You lost."
        case .tie:
            return "You tied."
        }
    }
}

struct MoveButtonView_Previews: PreviewProvider {
    static var previews: some View {
        MoveButtonView(scores: Scores(), icon: "🪨", move: .rock)
    }
}
