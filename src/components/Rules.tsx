import React from 'react'
import {Link} from 'react-router-dom';
import './Rules.css'

function Rules() {
  return (
    <div className='rules-container'>
      <div className="back-button-container">
        <Link to={"/"}>
          <svg className="arrow-go-left back-button" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.3776 9.14146C1.24392 9.23256 1.13439 9.35479 1.05844 9.49762C0.982489 9.64046 0.9424 9.79961 0.941624 9.96138C0.940847 10.1231 0.979406 10.2827 1.05398 10.4262C1.12855 10.5698 1.23691 10.6931 1.3697 10.7854L14.3263 19.8477C14.4758 19.9526 14.6511 20.0146 14.8333 20.0268C15.0155 20.0391 15.1975 20.0011 15.3596 19.9172C15.5218 19.8332 15.6578 19.7065 15.7529 19.5506C15.8481 19.3948 15.8987 19.2159 15.8993 19.0333L15.9857 1.03349C15.9858 0.851337 15.9363 0.672591 15.8424 0.516481C15.7485 0.360372 15.6139 0.232803 15.4529 0.147496C15.292 0.0621879 15.1108 0.0223684 14.929 0.0323194C14.7471 0.0422703 14.5713 0.101615 14.4207 0.203972L1.3776 9.14146Z" fill="#050259"></path></svg>
        </Link>
      </div>

      <div className='rules-container-2'>
        <h2>Basket tactics: The game - Rules</h2>
        <div className='rules-intro'>
          <h3>Introduction:</h3>
          <p>
            Basket tactics is a basketball rol videogame where the <span className='font-weight-strong'>coaches</span> (name given to those who participate in this game)
            will face each other in a match with a single purpose: Defeat the rival <span className='font-weight-strong'>coach</span>. In order to do that eaech competitor have to create your roster, plan his gameplan 
            and make em work in the floor.
          </p>
          <p>
            The gameboard dimentions are proportional to a real FIBA basketball court where each square meter will be traduce to a tile. This means the gameboard dimentions 
            are 28 x 15 and the hoops, the half court, the free throw line and the 3-point lines will be placed as realistic as possible. 
          </p>
          <p>
            The rules of the game are inspired by the real rules of the sport, so those not specified in this manual will be the same as the FIBA official rules.
          </p>
        </div>
        <div className="player-creation">
          <h3>Players creation</h3>
          <p>
            Before starting the match the <span className='font-weight-strong'>coaches</span> will have to provide they'r roosters. To do so they have a limited ammount
            of <span className='font-weight-strong'>skill points</span> to distribute among his 5 players and they'r <span className='font-weight-strong'>habilities</span>.
          </p>
          <div className="habilities-container">
            <h4>Physicals</h4>
            <dl>
              <dt>Height</dt>
              <dt>Weight</dt>
              <dt>Atleticism</dt>
            </dl>

            <h4>Habilities</h4>
            <dl>
              <dt>Perimeter defence:</dt>
              <dd>Affected by atleticism, weight(negatively), height. Affects the offensive capabilities of the opponents.</dd>

              <dt>Inside defence:</dt>
              <dd>Affected by atleticism, weight and height. Affects the offensive capabilities of the opponents.</dd>

              <dt>Rebounding</dt>
              <dd>Affected by atleticism, weight and height. It's used to calculate the chances of capturing a rebound.</dd>

              <dt>Perimeter scoring:</dt>
              <dd>Affected by atleticism, weight(negatively), height. It's used to calculate the chances of scoring from mid and long range.</dd>

              <dt>Inside scoring:</dt>
              <dd>Affected by atleticism, weight and height. It's used to calculate the chances of scoring from short and mid range.</dd>

              <dt>Playmaking:</dt>
              <dd>It's used to calculate the chances of make succesfull dribblings and passes.</dd>

            </dl>

          </div>
        </div>

        <div className="the-game">
          <h3>The game</h3>
          <div className="basics">
            <p>The match will consist of two parts, each lasting <span className='font-weight-strong'>6 (six) minutes</span> (not real but elapsed in the game).</p>

            <p>The team that wins the jump will have the ball in the hands of the PG.</p>

            <p>The development of the match will consist in multiple <span className='font-weight-strong'>instants</span> of the game which will take place in a sequence until the end of the game period.</p>

          </div>
          <div className="instants-turns">
            <h4>Instants and turns</h4>
            <p>The <span className='font-weight-strong'>instants</span> of the game will be 1 second long. At each one of them, all the players of each team must do at least one <span className='font-weight-strong'>action</span>. The moment where <span className='font-weight-strong'>coaches</span> choose wich <span className='font-weight-strong'>action</span> a player is going to perform is called <span className='font-weight-strong'>turn</span>.</p>
            <p>The <span className='font-weight-strong'>turns</span> are "simultaneous". In other words, both the attacking and defending <span className='font-weight-strong'>coaches</span> must choose a player to do the <span className='font-weight-strong'>action</span> they decide. The defending <span className='font-weight-strong'>coach</span> is the one who chooses first.</p>
            <p>Among the chosen players in the <span className='font-weight-strong'>turn</span>, the first one to select the <span className='font-weight-strong'>action</span> he is going to perform will be determined by <span className='font-weight-strong'>iniciative</span>. The <span className='font-weight-strong'>offensive capacity</span> of the player selected by the attacking <span className='font-weight-strong'>coach</span> (calculated by the <span className='font-weight-strong'>playmaking</span> and <span className='font-weight-strong'>scoring</span> of the sector in which the player is) is compared with the <span className='font-weight-strong'>defensive capacity</span> of the player selected by the defending <span className='font-weight-strong'>coach</span> (<span className='font-weight-strong'>defense</span> of the sector in which he is). The player with the most <span className='font-weight-strong'>initiative</span> is the one who must first choose the <span className='font-weight-strong'>action</span> to be done. It is worth remembering that the <span className='font-weight-strong'>turns</span> are "simultaneous" so the calculations of the result of both <span className='font-weight-strong'>actions</span> will consider the action perfomed by the other player.</p>
          </div>
          <div className="actions">
            <h4>Actions</h4>
            <p>At the beginning of the <span className='font-weight-strong'>instant</span> the <span className='font-weight-strong'>action points</span> of each player are calculated. The maximum amount of <span className='font-weight-strong'>action points</span> is 3(three) and a minimum is 1(one). More than one <span className='font-weight-strong'>action</span> can be done in each <span className='font-weight-strong'>turn</span> depending of the <span className='font-weight-strong'>action points</span> of the selected player and the <span className='font-weight-strong'>action points</span> needed to do each <span className='font-weight-strong'>action</span>.</p>
            <p>The <span className='font-weight-strong'>actions</span> can be clasified in 3 types:</p>
            <ol>
              <li><span className="action-type-title">Instantly calculated</span>: The result of the <span className='font-weight-strong'>action</span> is calculated at the end of the <span className='font-weight-strong'>turn</span></li>
              <li><span className="action-type-title">Postpound calculated</span>: The result of the <span className='font-weight-strong'>action</span> is calculated after another one is happen before the <span className='font-weight-strong'>turn</span> of this player in the next <span className='font-weight-strong'>instant</span></li>
              <li><span className="action-type-title">Lately calculated</span>: The result of the <span className='font-weight-strong'>action</span> is calculated at the end of the <span className='font-weight-strong'>instant</span></li>
            </ol>
            <p>At the same time, there are general, defensive and offensive <span className='font-weight-strong'>actions</span>. Considering all the information above, we are listing the diferent <span className='font-weight-strong'>actions</span></p>
            <h5>General actions</h5>
            <ul>
              <li><p><span className="action-type-title">Move</span>: It translate the player to another tile. It can be done only by players without the ball. It cost <span className='font-weight-strong'>1(one) action point</span> moving in one direction and <span className='font-weight-strong'>1.5(one and a half) action points</span> moving diagonally. (<span className="action-type-title">Instantly calculated</span>).</p></li>
              
            </ul>

            <h5>Defensive actions</h5>
            <ul>
              <li><p><span className="action-type-title">Steal attempt</span>: The player try to steal the ball. It can be done only by players next to the player with the ball or recivers of a pass. It cost <span className='font-weight-strong'>1(one) action point</span>. (<span className="action-type-title">Instantly calculated</span>).</p></li>
              <li><p><span className="action-type-title">Overwhelming waiting</span>: The player try to read the opponent's intentions and get ready to steal or block the ball. It can be done only by players next to an attacking player. It increase his defensive stats (Weakly if the offensive player is ubicated diagonally) for the next defensive <span className='font-weight-strong'>action</span>. It cost <span className='font-weight-strong'>1(one) action point</span>. (<span className="action-type-title">Instantly calculated</span>).</p></li>
              <li><p><span className="action-type-title">Wait with caution</span>: The player gets ready to act as soon as the closer offensive player do something. If 2(two) or more players are at the same distance this will apply to the first one to do something. It can be done only by players close to attacking players. After the closest attacking player do any <span className='font-weight-strong'>action</span> this player use another turn. After the effects of this <span className='font-weight-strong'>action</span> is activated the <span className='font-weight-strong'>iniciative</span> is calculated again. It cost <span className='font-weight-strong'>0.5(half) action points</span>. (<span className="action-type-title">Instantly activated</span>).</p></li>

            </ul>

            <h5>Offensive actions</h5>
            <ul>
              <li><p><span className="action-type-title">Pass</span>: The player give the ball to a teammate. It can be done only by players with the ball. It cost <span className='font-weight-strong'>0.5(half) action points</span>. (Depending in the distance between both players it can be <span className="action-type-title">Instantly calculated</span> or <span className="action-type-title">Postpound calculated</span>).</p></li>
              <li><p><span className="action-type-title">Dribble</span>: This is how the player with the ball translate across the court. If the player lost the dribbling he cannot <span className="action-type-title">Dribble</span> again until he <span className="action-type-title">Pass</span> the ball, <span className="action-type-title">Shoot</span> or make a <span className="action-type-title">Layup</span>. It's easyer for defenders to steal the ball from the offensive players if they are dribbling. It cost <span className='font-weight-strong'>1(one) action point</span> moving in one direction and <span className='font-weight-strong'>1.5(one and a half) action points</span> moving diagonally. (<span className="action-type-title">Instantly calculated</span>)</p></li>
              <li><p><span className="action-type-title">Wait without the ball</span>: The player gets ready to act increasing his stats until he's involved in a <span className="action-type-title">Pass</span>. If he catch the ball with no defenders next to him he can catch and <span className="action-type-title">Shoot</span> with a bonification or catch and <span className="action-type-title">Dribble</span> 1 tile with no <span className='font-weight-strong'>action points</span> cost and instantly. It cost <span className='font-weight-strong'>1(one) action point</span>. (<span className="action-type-title">Instantly activated</span>).</p></li>
              <li><p><span className="action-type-title">Tripple threat</span>: The player gets ready to act increasing his stats for his next move after the next opponent do any <span className='font-weight-strong'>action</span>. It cost <span className='font-weight-strong'>0.5(half) action points</span>. (<span className="action-type-title">Instantly activated</span>).</p></li>
              <li><p><span className="action-type-title">Shoot</span>: The player attempt a midium range or long range shot. If the player war dribbling the ball he'll have less effectiveness. It cost <span className='font-weight-strong'>1(one) action points</span>. (Lately calculated).</p></li>

            </ul>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Rules