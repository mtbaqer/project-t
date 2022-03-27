const WorldTimeAPIEndpoint = "https://worldtimeapi.org/api/ip";

const Offset = await fetch(WorldTimeAPIEndpoint)
  .then((res) => res.json())
  .then((res) => {
    const globaTimestamp = res.unixtime * 1000;
    const localTimestamp = Date.now();
    return globaTimestamp - localTimestamp;
  });

export default function getTimestamp() {
  const localTimestamp = Date.now();
  return localTimestamp + Offset;
}
