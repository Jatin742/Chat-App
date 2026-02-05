import animationData from "@/app/assets/lottie-json.json";

export const colors = [
    'bg-[#712c4a57] text-[#ff006e] border border-[#ff006faa]',
    'bg-[#ffd60a2a] text-[#ffd60e] border border-[#ffd60abb]',
    'bg-[#06d6a02a] text-[#06d6a0] border border-[#06d6a0bb]',
    'bg-[#4cc9f02a] text-[#4cc9f0] border border-[#4cc9f0bb]',
]

export const getColor = (color: number) => {
    if(color >= 0 && color<colors.length){
        return colors[color];
    }
    return colors[0];
}

// console.log(animationData);


export const animationDefaultOptions = {
    loop:true,
    autoplay: true,
    animationData
};