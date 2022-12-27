export default function textStroke(width: number, color: string) {
  const paintsNum = 32;
  let result = "text-shadow: ";
  for (let i = 0; i < paintsNum; i++ /* append shadows in n evenly distributed directions */) {
    const angle = (2 * Math.PI * i) / paintsNum;
    const x = width * Math.cos(angle);
    const y = width * Math.sin(angle);
    result += `${x}px ${y}px 0 ${color},`;
  }

  for (let i = 0; i < paintsNum; i++ /* append shadows in n evenly distributed directions */) {
    const angle = (2 * Math.PI * i) / paintsNum;
    const x = width * Math.cos(angle);
    const y = width * Math.sin(angle);
    if (y < 0) continue;
    result += `${x}px ${2 * y}px 0 ${color},`;
  }
  result = result.slice(0, -1);
  result += ";";

  return result;
}
