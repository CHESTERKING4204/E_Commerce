import React from "react";
import './animations.css'; // Import the CSS file
import IronMan from '../images/Iron Man.jpg'
import CaptainAmerica from '../images/Captain America.jpg';
import Hawkeye1 from '../images/Hawkeye 1.jpg';
import Hawkeye2 from '../images/Hawkeye 2.jpg';
import Power from '../stones/power-stone.jpg';
import Soul from '../stones/soul-stone.jpg';
import Mind from '../stones/mind-stone.jpg';
import Reality from '../stones/reality-stone.jpg';
import Space from '../stones/space-stone.jpg';
import Time from '../stones/time-stone.jpg';

const Home = () => {
    /*https://wallpapers.com/images/high/iron-man-suit-4000-x-5000-wallpaper-mucgmkrlzsayummc.webp */
    return (
        <div className="bg-slate-800">
            <div className="flex justify-center w-full bg-white animate-colorChange">
                <h1 className="text-4xl font-bold p-4">♥ Love You 3000 ♥</h1>
            </div>


            {/* Main Section Start from here */}

            <div id="section1" className="p-7 justify-between group flex LChangeRed">
                <div>
                    <img src="https://wallpapers.com/images/high/iphone-x-iron-man-background-1125-x-2435-fsl56ed6tgd9mrl3.webp" alt="Iron_Man" className="group-hover:hidden h-full ml-10 rounded-md w-64 " />
                    <img src={IronMan} alt="Iron_Man" className="hidden group-hover:inline h-full ml-10 rounded-md w-60 " />
                </div>

                <div className="w-3/4 mr-10 h-full">
                    <span className="bold text-white justify-center items-center text-3xl flex h-full group-hover:hidden" id="Font">
                        IRON MAN
                    </span>

                    <div className="hidden group-hover:block m-3 h-full text-center">
                        <span className="text-4xl  text-white">
                            IRON MAN
                        </span>
                        <br />
                        <span className="text-xl text-slate-400">Genius,Playboy,Billionarie,Philanthrophist</span>
                        <br />
                        <br />
                        <p className="text-2xl">In the labyrinth of Stark's genius, metal morphs into might, and the arc reactor's hum whispers of an 
                            indomitable will. Tony Stark, the modern Daedalus, crafts not just a suit but a legacy of brilliance and sacrifice. 
                            His iron-clad heart, beating with tech-fueled defiance, transforms mortal frailty into invincible armor, making him a 
                            beacon of innovation and heroism in a world teetering on the edge.</p>
                    </div>
                </div>
            </div>


            <div id="section1" className="p-7 justify-between group flex RChangeBlue">
                <div className="w-3/4 ml-10 h-full ">
                    <span className="bold text-white justify-center items-center text-3xl flex h-full group-hover:hidden" id="Font">
                        CAPTAIN AMERICA
                    </span>

                    <div className="hidden group-hover:block m-3 h-full text-center">
                        <span className="text-5xl text-white">
                            CAPTAIN AMERICA
                        </span>
                        <br />
                        <span className="text-xl text-slate-400">Super Soldier,Born Leader,Worthy</span>
                        <br />
                        <br />
                        <p className="text-2xl ">From the frozen tundra of time emerges Steve Rogers, the living testament to unyielding valor and 
                            steadfast morality. His shield, a symbol of unbreakable resolve, clashes against tyranny, resonating with the timeless 
                            echo of freedom's call. Captain America stands as the sentinel of liberty, a bygone era's knight wielding honor and 
                            courage as his timeless arsenal against the encroaching shadows of modernity.</p>
                    </div>
                </div>

                <div>
                    <img src="https://wallpapers.com/images/high/captain-america-desktop-764-x-1136-wouguaftfnwi8v8n.webp" alt="Captain_America" className="group-hover:hidden h-full mr-10 rounded-md w-64 border-black border-2" />
                    <img src={CaptainAmerica} alt="Captain_America" className="hidden group-hover:inline h-full mr-10 rounded-md w-64 border-black border-2" />
                </div>
            </div>


            <div id="section1" className="p-7 justify-between group flex LChangeGreen">
                <div>
                    <img src="https://wallpapers.com/images/high/ragnarok-hulk-in-gladiator-suit-4fky4p2ijd0bx7vo.webp" alt="Hulk" className="group-hover:hidden h-full ml-10 rounded-md w-64 border-black border-2" />
                    <img src="https://wallpapers.com/images/hd/violent-hulk-rage-mode-hd-0o6a5ahcibkxve1e.webp" alt="Hulk" className="hidden group-hover:inline h-full ml-10 rounded-md w-64 border-black border-2" />
                </div>

                <div className="w-3/4 mr-10 h-full">
                    <span className="bold text-white justify-center items-center text-3xl flex h-full group-hover:hidden" id="Font">
                        HULK
                    </span>

                    <div className="hidden group-hover:block m-3 h-full text-center">
                        <span className="text-4xl  text-white">
                            HULK
                        </span>
                        <br />
                        <span className="text-xl text-slate-400">SMASH!!</span>
                        <br />
                        <br />
                        <p className="text-2xl">In the volatile heart of Bruce Banner, a tempest brews—a creature of chaos and raw, untamed power. 
                            The Hulk, an emerald colossus, embodies the primal force within us all, a symphony of rage and resilience. He is both 
                            the cataclysm and the calm, a walking paradox whose thunderous roars and seismic fury remind the world that within our 
                            most profound vulnerabilities lies our greatest strength.</p>
                    </div>
                </div>
            </div>


            <div id="section1" className="p-7 justify-between group flex RChangeBlue">
                <div className="w-3/4 ml-10 h-full ">
                    <span className="bold text-white justify-center items-center text-3xl flex h-full group-hover:hidden" id="Font">
                        THOR
                    </span>

                    <div className="hidden group-hover:block m-3 h-full text-center">
                        <span className="text-5xl text-white">
                            THOR
                        </span>
                        <br />
                        <span className="text-xl text-slate-400">God of Thunder,Forever Worthy</span>
                        <br />
                        <br />
                        <p className="text-2xl ">From the celestial realms of Asgard descends Thor, the God of Thunder, 
                            his presence a storm of divine majesty and might. With Mjölnir in hand, he channels the cosmos' fury, 
                            his strikes echoing through the annals of mythology and into the present. Thor's journey, a blend of myth and man, 
                            weaves a tapestry of heroic grandeur, where the thunder's roll heralds a legacy as eternal as the stars.</p>
                    </div>
                </div>

                <div>
                    <img src="https://wallpapers.com/images/high/thor-hammer-83gfl859uontizhu.webp" alt="Thor" className="group-hover:hidden h-full mr-10 rounded-md w-64 border-black border-2" />
                    <img src="https://wallpapers.com/images/high/thor-pictures-h5xo3uqo4ha2s4h7.webp" alt="Thor" className="hidden group-hover:inline h-full mr-10 rounded-md w-64 border-black border-2" />
                </div>
            </div>


            <div id="section1" className="p-7 justify-between group flex LChangeGToR">
                <div>
                    <img src="https://wallpapers.com/images/high/black-widow-iphone-1kcd6hrg966t7mjj.webp" alt="Black_Widow" className="group-hover:hidden h-full ml-10 rounded-md w-64 border-black border-2" />
                    <img src="https://wallpapers.com/images/high/black-widow-iphone-fpz0r2dgcfq3gw3e.webp" alt="Black_Widow" className="hidden group-hover:inline h-full ml-10 rounded-md w-64 border-black border-2" />
                </div>

                <div className="w-3/4 mr-10 h-full">
                    <span className="bold text-white justify-center items-center text-3xl flex h-full group-hover:hidden" id="Font">
                        BLACK WIDOW
                    </span>

                    <div className="hidden group-hover:block m-3 h-full text-center">
                        <span className="text-4xl  text-white">
                            BLACK WIDOW
                        </span>
                        <br />
                        <span className="text-xl text-slate-400">Red Room experiment,Humen killing machine</span>
                        <br />
                        <br />
                        <p className="text-2xl">In the shadows where secrets weave a web of deception, Natasha Romanoff dances with deadly grace. 
                            The Black Widow, a master of espionage and combat, is a specter of finesse and lethal precision. Her past, a mosaic of 
                            redemption and regret, fuels a resolve as steely as her gaze. She is the dark ballet of the Avengers, where each step is a
                            calculated strike in the choreography of clandestine warfare.</p>
                    </div>
                </div>
            </div>


            <div id="section1" className="p-7 justify-between group flex RChangeViolet">
                <div className="w-3/4 ml-10 h-full ">
                    <span className="bold text-white justify-center items-center text-3xl flex h-full group-hover:hidden" id="Font">
                        HAWKEYE
                    </span>

                    <div className="hidden group-hover:block m-3 h-full text-center">
                        <span className="text-5xl text-white">
                            HAWKEYE
                        </span>
                        <br />
                        <span className="text-xl text-slate-400">Eagles Eye</span>
                        <br />
                        <br />
                        <p className="text-2xl ">With a quiver full of precision and a heart steadfastly aimed, Clint Barton, the Hawkeye, 
                            turns simplicity into sheer spectacle. His arrows, extensions of his indomitable focus, strike with surgical exactness. 
                            In a world of gods and monsters, he stands as the mortal reminder that true heroism is not measured by power, but by the 
                            unerring resolve to protect and prevail, one shot at a time.</p>
                    </div>
                </div>

                <div>
                    <img src={Hawkeye1} alt="Hawkeye" className="group-hover:hidden h-full mr-10 rounded-md w-64 border-black border-2" />
                    <img src={Hawkeye2} alt="Hawkeye" className="hidden group-hover:inline h-full mr-10 rounded-md w-64 border-black border-2" />
                </div>
            </div>

            
            <span id="Font" className="text-4xl h-20 justify-center flex items-center underline bold bg-[url('https://wallpapers.com/images/high/infinity-stones-rr08y4uvhmz7uwcq.webp')] text-yellow-400">INFINITY STONES</span>
            <div id="section1">
                <div className="group relative">
                    <img src={Power} alt="Power_stone" className="group-hover:blur-sm"/>
                    <div className="absolute inset-0 flex font-semibold items-center justify-center  bg-opacity-50 text-white text-3xl bold opacity-0 text transition-opacity duration-300 group-hover:opacity-100">
                        Power Stone
                    </div>
                </div>
                <div className="group relative">
                <img src={Soul} alt="Soul_stone" className="group-hover:blur-sm"/>
                    <div className="absolute inset-0 flex font-semibold items-center justify-center  bg-opacity-50 text-white text-3xl bold opacity-0 text transition-opacity duration-300 group-hover:opacity-100">
                        Soul Stone
                    </div>
                </div>
                <div className="group relative">
                <img src={Time} alt="Time_stone" className="group-hover:blur-sm"/>
                    <div className="absolute inset-0 flex font-semibold items-center justify-center  bg-opacity-50 text-white text-3xl bold opacity-0 text transition-opacity duration-300 group-hover:opacity-100">
                        Time Stone
                    </div>
                </div>
                <div className="group relative">
                <img src={Reality} alt="Reality_stone" className="group-hover:blur-sm"/>
                    <div className="absolute inset-0 flex font-semibold items-center justify-center  bg-opacity-50 text-white text-3xl bold opacity-0 text transition-opacity duration-300 group-hover:opacity-100">
                        Reality Stone
                    </div>
                </div>
                <div className="group relative">
                <img src={Space} alt="Space_stone" className="group-hover:blur-sm"/>
                    <div className="absolute inset-0 flex font-semibold items-center justify-center  bg-opacity-50 text-white text-3xl bold opacity-0 text transition-opacity duration-300 group-hover:opacity-100">
                        Space Stone
                    </div>
                </div>
                <div className="group relative">
                <img src={Mind} alt="Mind_stone" className="group-hover:blur-sm"/>
                    <div className="absolute inset-0 font-semibold flex items-center justify-center  bg-opacity-50 text-white text-3xl bold opacity-0 text transition-opacity duration-300 group-hover:opacity-100">
                        Mind Stone
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
