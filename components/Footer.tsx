/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'


const Footer = () => {
    return (<footer className="block w-5/6 h-fit">
        <div className="px-5 md:px-10">
            <div className="mx-auto w-full">
                <div className="py-16 md:py-24 lg:py-32">
                    <div className="flex flex-row justify-between max-[767px]:flex-col max-[767px]:items-start">
                        <div className="w-full max-w-[560px] max-[991px]:mr-4 max-[991px]:flex-initial max-[767px]:mr-0">
                            <h2 className="mb-4 font-extrabold text-white text-3xl md:text-5xl">
                                <span className="text-[#c9fd02]">PokeMMO Utilities</span> PVP & PVE
                            </h2>
                        </div>
                        <div className="max-[991px]:ml-4 max-[991px]:flex-none max-[767px]:ml-0 max-[767px]:mt-8">
                            <div className="mb-4 flex max-w-[272px] items-start justify-start">
                                <img src="https://assets.website-files.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28fe_MapPin.svg" alt="location" className="inline-block max-w-full mr-3" />
                                <p className="text-white">Teselia Ch3.</p>
                            </div>
                            <div className="mb-4 flex max-w-[272px] items-start justify-start">
                                <img src="https://assets.website-files.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28ff_sms.svg" alt="email" className="inline-block max-w-full mr-3" />
                                <p className="text-white">briter456@gmail.com</p>
                            </div>
                            <div className="mb-4 flex max-w-[272px] items-start justify-start">
                                <img src="https://dashboard.snapcraft.io/site_media/appmedia/2022/03/icon-small.svg.png" alt="ign" className="inline-block max-w-full mr-3" width={24} height={24} />
                                <p className="text-white">LemonMantis</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-20 mt-20 w-full border-[0.5px] border-solid border-[#101010]"></div>
                    <div className="flex flex-row justify-between max-[991px]:items-center max-[767px]:flex-col max-[767px]:items-start max-[479px]:flex-col-reverse">
                        <div className="font-semibold max-[991px]:ml-0 max-[991px]:mr-0 max-[479px]:mb-4 max-[991px]:py-1 text-center sm:text-center">
                            <a href="https://lemon-mantis-dev.vercel.app/" target="_blank" className="inline-block font-normal text-[#636262] transition hover:text-white sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pl-0 pr-6">About</a>
                            <a href="https://github.com/LemonMantis5571" target="_blank" className="inline-block font-normal text-[#636262] transition hover:text-white sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pl-0 pr-6">Works</a>
                        </div>
                        <div className="max-[991px]:flex-none">
                            <p className="text-[#636262]">© Copyright 2023. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>)
}

export default Footer