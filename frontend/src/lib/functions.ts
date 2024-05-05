export const getTimeSince = (dateString) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const difference = now.getTime() - postDate.getTime()
  if (difference < 60000) {
    return "a moment ago";
  }

  const hours = Math.floor(difference / 3600000); 
  if (hours >= 1) {
    if (hours > 24 && hours < 48) {
      const days = Math.floor(hours / 24);
      return `${days} day ago`;
    } else if (hours > 48) {
      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    } else if (hours === 1) {
      return "1 hour ago";
    }
    return `${hours} hours ago`;
  } else {
    const minutes = Math.floor(difference / 60000);
    if (minutes === 1) {
      return "1 minute ago";
    }
    return `${minutes} minutes ago`;
  }
};
