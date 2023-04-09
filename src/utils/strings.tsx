export const shortenHash = (hash: string, charsStart = 4, charsEnd?: number): string => {
  return `${hash.substring(0, charsStart + 2)}...${hash.substring(
    hash.length - (charsEnd || charsStart)
  )}`;
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function ipfsUriToUrl(ipfsUri: string | undefined) {
  if (typeof ipfsUri === "string" && ipfsUri.startsWith("https://")) {
    return ipfsUri;
  }
  if (typeof ipfsUri === "string" && ipfsUri.startsWith("ipfs://")) {
    return "https://ipfs.io/ipfs/" + ipfsUri.slice(7);
  } else {
    return `https://api.dicebear.com/6.x/identicon/svg?seed=${ipfsUri}&backgroundColor=b6e3f4`;
  }
}
