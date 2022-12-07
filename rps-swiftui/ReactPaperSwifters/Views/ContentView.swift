//
//  ContentView.swift
//  ReactPaperSwifters
//
//  Created by Peyton Gasink on 12/6/22.
//

import SwiftUI

struct ContentView: View {
    @StateObject var scores = Scores()
    
    var body: some View {
        ZStack {
            Color("DarkBackground")
                .ignoresSafeArea()
            
            VStack {
                HStack {
                    Spacer()
                    
                    ScoreView(name: "PLAYER", score: scores.userScore, playerType: .user)
                    
                    Spacer()
                    Spacer()
                    
                    ScoreView(name: "COMPUTER", score: scores.computerScore, playerType: .computer)
                    
                    Spacer()
                }
                
                Spacer()
                
                HStack {
                    Spacer()
                    MoveButtonView(scores: scores, text: "🪨", move: .rock)
                    Spacer()
                    Spacer()
                    MoveButtonView(scores: scores, text: "📃", move: .paper)
                    Spacer()
                    Spacer()
                    MoveButtonView(scores: scores, text: "✂️", move: .scissors)
                    Spacer()
                }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
