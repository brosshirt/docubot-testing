import Bottleneck from "bottleneck"

export function functionLimiter(limitedFunction, delay){
    const limiter = new Bottleneck({
        maxConcurrent: 1,
        minTime: delay
    })
    return limiter.wrap(limitedFunction)
}