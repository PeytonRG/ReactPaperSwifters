//
//  Score.swift
//  ReactPaperSwifters
//
//  Created by Peyton Gasink on 12/6/22.
//

import SwiftUI

struct ScoreView: View {
    let name: String
    let score: Int
    let playerType: Player
    
    var body: some View {
        VStack {
            Text(name)
                .font(.title2)
                .foregroundColor(playerType == .user ? .blue : .red)
            
            Text(String(score))
                .font(.custom("DBLCDTempBlack", size: 45))
                .frame(width: 120, height: 75)
                .border(.primary)
        }
    }
}

struct ScoreView_Previews: PreviewProvider {
    static var previews: some View {
        ScoreView(name: "PLAYER", score: 0, playerType: .user)
    }
}
