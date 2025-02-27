import  aj  from "../config/arcjet.js";
export const arcjetMiddleware = async (req,res,next)=>{
    try{
        const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
        console.log("Arcjet decision", decision);
      
        if (decision.isDenied()) {
          if (decision.reason.isRateLimit()) {
            res.status(429).json({ error: "Too Many Requests" });
          } else if (decision.reason.isBot()) {
            res.status(403).json({error:'Bot Deetected'})
          } else {
            res.status(403).json({error:'Access Denied'})
          }
        } 
        //If decision is not denied then move to the next middleware
        next()
    }
    catch(e){
        console.error('Arcjet Middleware Error',e)
        next(e);
    }
}