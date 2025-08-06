'use client';

export default function FooterAbt(){
   
    return (
        

        <div className="flex w-full h-20 justify-between bg-slate-800/90  backdrop-blur-sm  items-center px-4 m-1 text-white w-130">    
            <div className="">   
                <a href="/"  className="rounded-[11px] px-5 py-1.5 mx-5 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" >Login</a> 
                <a href="/about" className="rounded-[11px] px-5 py-1.5 mx-5 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" >About</a>
                <a href='https://docs.google.com/forms/d/e/1FAIpQLSc0WqaBH887mQgKbw5SaK0Mjo32JVCOEzv0enMSYnfyjkMvAQ/viewform?usp=dialog' className="rounded-[11px] px-5 py-1.5 mx-5 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" >Feedback</a>
                <a href='https://github.com/MohamedAlDeep/Onthego-secure-comms' className="rounded-[11px] px-5 py-1.5 mx-5 transition-all duration-300 ease-in-out hover:bg-[#BD2ABA]" >Contribute</a>
            </div>
        </div>
     
    )
}