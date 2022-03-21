const WorldTimeAPIEndpoint = "http://worldtimeapi.org/api/ip";

const Offset = fetch(WorldTimeAPIEndpoint).then((res)=>res.json()).then((res)=>{
    const globaTimestamp = res.unixtime * 1000;
    const localTimestamp = Date.now();
    return globaTimestamp - localTimestamp;
});

export default async function getTimestamp(){
    const localTimestamp = Date.now();
    return localTimestamp + await Offset;
}
