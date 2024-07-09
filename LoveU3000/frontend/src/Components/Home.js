import React from "react";
import './animations.css'; // Import the CSS file

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
                    <img src="https://e1.pxfuel.com/desktop-wallpaper/29/756/desktop-wallpaper-man-for-phone-iron-man-for-mobile.jpg" alt="Iron_Man" className="hidden group-hover:inline h-full ml-10 rounded-md w-60 " />
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
                        <span className="text-xl text-slate-400">Specialities</span>
                        <br />
                        <br />
                        <p className="text-2xl">Here I come on the serious matter</p>
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
                        <span className="text-xl text-slate-400">Specialities</span>
                        <br />
                        <br />
                        <p className="text-2xl ">Here I come on the serious matter</p>
                    </div>
                </div>

                <div>
                    <img src="https://wallpapers.com/images/high/captain-america-desktop-764-x-1136-wouguaftfnwi8v8n.webp" alt="Captain_America" className="group-hover:hidden h-full mr-10 rounded-md w-64 border-black border-2" />
                    <img src="https://e0.pxfuel.com/wallpapers/850/134/desktop-wallpaper-captain-america-captain-america.jpg" alt="Captain_America" className="hidden group-hover:inline h-full mr-10 rounded-md w-64 border-black border-2" />
                </div>
            </div>


            <div id="section1" className="p-7 justify-between group flex LChangeGreen">
                <div>
                    <img src="https://e0.pxfuel.com/wallpapers/54/86/desktop-wallpaper-professor-hulk-man-bun-superheroes-and-hulk-marvel-hulk-man-hulk-avengers.jpg" alt="Hulk" className="group-hover:hidden h-full ml-10 rounded-md w-64 border-black border-2" />
                    <img src="https://e0.pxfuel.com/wallpapers/299/613/desktop-wallpaper-iron-man-hulk-vs-iron-man-hulk-buster-armor-hulk-veronica-tony-stark-hulk-iron-man-hulk-avengers-marvel-posters-hulk-marvel-ironman-vs-hulk.jpg" alt="Hulk" className="hidden group-hover:inline h-full ml-10 rounded-md w-64 border-black border-2" />
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
                        <span className="text-xl text-slate-400">Specialities</span>
                        <br />
                        <br />
                        <p className="text-2xl">Here I come on the serious matter</p>
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
                        <span className="text-xl text-slate-400">Specialities</span>
                        <br />
                        <br />
                        <p className="text-2xl ">Here I come on the serious matter</p>
                    </div>
                </div>

                <div>
                    <img src="https://e1.pxfuel.com/desktop-wallpaper/236/874/desktop-wallpaper-thor-s-stormbreaker-thor-stormbreaker.jpg" alt="Thor" className="group-hover:hidden h-full mr-10 rounded-md w-64 border-black border-2" />
                    <img src="https://e0.pxfuel.com/wallpapers/860/406/desktop-wallpaper-thor-thor-thunder-thunder.jpg" alt="Thor" className="hidden group-hover:inline h-full mr-10 rounded-md w-64 border-black border-2" />
                </div>
            </div>


            <div id="section1" className="p-7 justify-between group flex LChangeGToR">
                <div>
                    <img src="https://e0.pxfuel.com/wallpapers/566/18/desktop-wallpaper-scarlet-johansson-black-widow-avengers.jpg" alt="Black_Widow" className="group-hover:hidden h-full ml-10 rounded-md w-64 border-black border-2" />
                    <img src="https://e0.pxfuel.com/wallpapers/220/424/desktop-wallpaper-black-widow-movie-art-iphone-1-black-widow-avengers-black-widow-marvel-black-widow-movie-natasha-romanoff-iphone.jpg" alt="Black_Widow" className="hidden group-hover:inline h-full ml-10 rounded-md w-64 border-black border-2" />
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
                        <span className="text-xl text-slate-400">Specialities</span>
                        <br />
                        <br />
                        <p className="text-2xl">Here I come on the serious matter</p>
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
                        <span className="text-xl text-slate-400">Specialities</span>
                        <br />
                        <br />
                        <p className="text-2xl ">Here I come on the serious matter</p>
                    </div>
                </div>

                <div>
                    <img src="https://e0.pxfuel.com/wallpapers/403/254/desktop-wallpaper-hawkeye-iphone-marvel-hawkeye.jpg" alt="Hawkeye" className="group-hover:hidden h-full mr-10 rounded-md w-64 border-black border-2" />
                    <img src="https://e0.pxfuel.com/wallpapers/913/172/desktop-wallpaper-imposing-archer-hawk-eye-jeremy-renner-marvel-art-10801920-ojo-de-alcon-marvel-ojo-de-alcon-magnificos-jeremy-renner-hawkeye.jpg" alt="Hawkeye" className="hidden group-hover:inline h-full mr-10 rounded-md w-64 border-black border-2" />
                </div>
            </div>
        </div>
    );
}

export default Home;
