export const updateFollowerCount = (change: number) => {
  const followerCountElement = document.getElementById(
    "follower_count_profile"
  ) as HTMLSpanElement | null;
  if (followerCountElement) {
    const newValue = Number(followerCountElement.innerText) + change;
    followerCountElement.innerText = String(newValue);
  }
};
