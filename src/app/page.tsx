"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import diningData from '../data/data.json';

// Create 20 Spotify Wrapped-style insights from the data
const createInsightsData = () => {
  const data = diningData.my2024;
  
  return [
    {
      id: 1,
      title: "Your #1 Splurge",
      restaurant: data.restaurantMetrics.topRestaurantsBySpend[0].name,
      detail: `${data.restaurantMetrics.topRestaurantsBySpend[0].checkIns} visits • $${(data.restaurantMetrics.topRestaurantsBySpend[0].totalSpent.value / 100).toLocaleString()} spent`,
      location: "Most Expensive Restaurant",
      searchQuery: "fine dining luxury restaurant"
    },
    {
      id: 2,
      title: "Your Go-To Spot",
      restaurant: data.restaurantMetrics.topRestaurantsByCheckIn[0].name,
      detail: `${data.restaurantMetrics.topRestaurantsByCheckIn[0].checkIns} visits • ${data.restaurantMetrics.topRestaurantsByCheckIn[0].percentage}% of all dining`,
      location: "Most Frequent Visits",
      searchQuery: "bakery bread pastry cafe"
    },
    {
      id: 3,
      title: "Total Dining Spend",
      restaurant: `$${(data.spendingPatterns.totalSpent.value / 100).toLocaleString()}`,
      detail: `${data.timeAndFrequency.totalCheckIns} check-ins across 2024`,
      location: "Your Year in Numbers",
      searchQuery: "restaurant spending analytics"
    },
    {
      id: 4,
      title: "Fly Points Master",
      restaurant: `${data.flyMetrics.totalFlyEarned.toLocaleString()} FLY`,
      detail: `${data.flyMetrics.avgFlyEarnedPerCheckIn} avg per visit • $${(data.spendingPatterns.totalSavedFromRewards.value / 100).toLocaleString()} saved`,
      location: "Rewards Earned",
      searchQuery: "loyalty points rewards"
    },
    {
      id: 5,
      title: "Your Cuisine Champion",
      restaurant: data.cuisineAndPreferences.topCuisinesByCount[0].cuisine,
      detail: `${data.cuisineAndPreferences.topCuisinesByCount[0].count} visits • Your most-ordered cuisine`,
      location: "Cuisine Preference",
      searchQuery: "italian restaurant pasta"
    },
    {
      id: 6,
      title: "Biggest Single Bill",
      restaurant: data.restaurantMetrics.mostExpensiveMeal.restaurant,
      detail: `$${(data.restaurantMetrics.mostExpensiveMeal.amount.value / 100).toLocaleString()} • ${data.restaurantMetrics.mostExpensiveMeal.date}`,
      location: "Most Expensive Meal",
      searchQuery: "fine dining expensive meal"
    },
    {
      id: 7,
      title: "Your Food Streak",
      restaurant: data.restaurantMetrics.longestStreakAtSameRestaurant.restaurant,
      detail: `${data.restaurantMetrics.longestStreakAtSameRestaurant.streak} visits in a row • ${data.restaurantMetrics.longestStreakAtSameRestaurant.period}`,
      location: "Loyalty Champion",
      searchQuery: "bakery pastry streak"
    },
    {
      id: 8,
      title: "Weekend Warrior",
      restaurant: `${data.timeAndFrequency.weekdayVsWeekendRatio.split(',')[1].trim()}`,
      detail: `You dine out more on weekends • ${data.timeAndFrequency.favoriteTimeOfDay} is your peak time`,
      location: "Dining Habits",
      searchQuery: "weekend dining pattern"
    },
    {
      id: 9,
      title: "Cross-Country Foodie",
      restaurant: `${data.geographic.totalCitiesVisited} Cities`,
      detail: `${data.geographic.topCities[0].name}: ${data.geographic.topCities[0].checkIns} visits • ${data.geographic.topCities[1].name}: ${data.geographic.topCities[1].checkIns} visits`,
      location: "Geographic Explorer",
      searchQuery: "travel dining cities"
    },
    {
      id: 10,
      title: "Your Hood",
      restaurant: data.geographic.topNeighborhoods[0].name,
      detail: `${data.geographic.topNeighborhoods[0].checkIns} visits • Your most-dined neighborhood`,
      location: "Home Base",
      searchQuery: "neighborhood dining local"
    },
    {
      id: 11,
      title: "Dining Personality",
      restaurant: data.uniqueInsights.diningPersonality,
      detail: `${data.uniqueInsights.personalityTraits[0]} • ${data.uniqueInsights.personalityTraits[1]}`,
      location: "Your Type",
      searchQuery: "culinary connoisseur personality"
    },
    {
      id: 12,
      title: "Growth Story",
      restaurant: `+${data.uniqueInsights.yearOverYearGrowth.checkInsIncrease}`,
      detail: `Check-ins increased • +${data.uniqueInsights.yearOverYearGrowth.spendingIncrease} spending growth`,
      location: "Year Over Year",
      searchQuery: "growth dining analytics"
    },
    {
      id: 13,
      title: "Adventure Level",
      restaurant: `${data.cuisineAndPreferences.totalCuisineTypes} Cuisines`,
      detail: `${data.cuisineAndPreferences.newCuisinesTried.length} new ones tried • ${data.cuisineAndPreferences.comfortFoodRatio.split(',')[1].trim()}`,
      location: "Culinary Explorer",
      searchQuery: "diverse cuisine adventure"
    },
    {
      id: 14,
      title: "Peak Dining Month",
      restaurant: data.timeAndFrequency.busiestDiningMonth,
      detail: `${data.spendingPatterns.spendingByMonth.December.value / 100} spent • Your hungriest month`,
      location: "Monthly Champion",
      searchQuery: "december dining peak"
    },
    {
      id: 15,
      title: "Blackbird Status",
      restaurant: `${data.socialAndStatus.currentStatus} Member`,
      detail: `${data.socialAndStatus.rewardsUnlocked} rewards unlocked • ${data.socialAndStatus.bbPayUsage} BB Pay usage`,
      location: "Elite Status",
      searchQuery: "vip member status"
    },
    {
      id: 16,
      title: "Social Butterfly",
      restaurant: `${data.socialAndStatus.avgPartySize} Avg Party Size`,
      detail: `${data.socialAndStatus.friendsIntroducedToBlackbird} friends introduced • ${data.socialAndStatus.referralsMade} referrals made`,
      location: "Community Builder",
      searchQuery: "social dining friends"
    },
    {
      id: 17,
      title: "Distance Traveled",
      restaurant: `${data.geographic.milesWalkedToDine} Miles`,
      detail: `Walked to restaurants • Farthest: ${data.geographic.farthestRestaurant.name} (${data.geographic.farthestRestaurant.distance} mi)`,
      location: "Food Journey",
      searchQuery: "travel distance dining"
    },
    {
      id: 18,
      title: "Budget Sweet Spot",
      restaurant: `$${(data.spendingPatterns.avgSpendPerCheckIn.value / 100).toFixed(0)} Average`,
      detail: `Per visit • Most on ${Object.keys(data.spendingPatterns.spendingByDayOfWeek)[0]}s`,
      location: "Spending Pattern",
      searchQuery: "budget dining average"
    },
    {
      id: 19,
      title: "Cheapest Find",
      restaurant: data.restaurantMetrics.cheapestMeal.restaurant,
      detail: `$${(data.restaurantMetrics.cheapestMeal.amount.value / 100).toFixed(2)} • ${data.restaurantMetrics.cheapestMeal.date}`,
      location: "Budget Champion",
      searchQuery: "cheap eats pizza"
    },
    {
      id: 20,
      title: "Your 2024 Legacy",
      restaurant: `${data.timeAndFrequency.totalCheckIns} Dining Experiences`,
      detail: `${(data.timeAndFrequency.totalCheckIns / 365 * 100).toFixed(1)}% of days included dining • What a year!`,
      location: "Year in Review",
      searchQuery: "dining year summary legacy"
    }
  ];
};

const cardData = createInsightsData();

interface RevealedCard {
  id: string; // Use string to make unique across cycles
  position: { x: number; y: number };
  data: typeof cardData[0];
  dataIndex: number; // Track which card from the dataset this is
  imageUrl?: string; // Store the fetched image URL
}

// Reliable image function - using curated food images
const fetchRestaurantImage = async (query: string, index: number): Promise<string> => {
  // Predefined curated food/restaurant images from Unsplash (direct URLs)
  const curatedImages = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&crop=center", // Fine dining
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&crop=center", // Bakery
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop&crop=center", // Modern restaurant
    "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop&crop=center", // Korean cuisine
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop&crop=center", // Italian pasta
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&crop=center", // Pizza
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&crop=center", // Steakhouse
    "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=600&h=400&fit=crop&crop=center", // French bakery
    "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop&crop=center", // Mexican food
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&crop=center"  // Brunch
  ];
  
  try {
    // Use the curated image based on the index, cycling through if needed
    const selectedImage = curatedImages[index % curatedImages.length];
    console.log(`Card ${index + 1}: Using image ${selectedImage}`);
    return selectedImage;
  } catch (error) {
    console.error('Error getting restaurant image:', error);
    // Fallback to a default food image
    return "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop&crop=center";
  }
};

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [revealedCards, setRevealedCards] = useState<RevealedCard[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0); // Track which card we're on in the dataset
  const [totalRevealed, setTotalRevealed] = useState(0);
  const whitePageRef = useRef<HTMLDivElement>(null);

  const handleClick = async (e: React.MouseEvent) => {
    setClicked(true);
    
    // Capture the click position relative to the viewport
    const clickX = e.clientX;
    const clickY = e.clientY;
    
    // Immediately show the first card close to where the user clicked
    setTimeout(async () => {
      if (whitePageRef.current) {
        const rect = whitePageRef.current.getBoundingClientRect();
        // Convert viewport coordinates to white page coordinates
        const cardX = clickX - rect.left;
        const cardY = clickY - rect.top;
        
        const imageUrl = await fetchRestaurantImage(cardData[0].searchQuery, 0);
        const firstCard: RevealedCard = {
          id: `card-0-${Date.now()}`,
          position: { x: cardX, y: cardY },
          data: cardData[0],
          dataIndex: 0,
          imageUrl
        };
        
        setRevealedCards([firstCard]);
        setCurrentDataIndex(1);
        setTotalRevealed(1);
      }
    }, 100); // Small delay to ensure the white page is rendered
  };

  // Track mouse movement on white page
  useEffect(() => {
    if (!clicked) return;

    const handleMouseMove = async (e: MouseEvent) => {
      if (!whitePageRef.current) return;

      const rect = whitePageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if cursor has moved far enough from last revealed card to reveal a new one
      const minDistanceToReveal = 250; // Minimum distance to reveal new card
      
      // Skip if no cards are revealed yet (first card is shown automatically on click)
      if (revealedCards.length === 0) {
        return;
      }

      // Check distance from cursor to the last revealed card only
      const lastRevealedCard = revealedCards[revealedCards.length - 1];
      const distanceFromLastCard = Math.sqrt(
        Math.pow(x - lastRevealedCard.position.x, 2) + Math.pow(y - lastRevealedCard.position.y, 2)
      );

      // If cursor is far enough from the last revealed card, reveal a new card
      if (distanceFromLastCard > minDistanceToReveal) {
        const imageUrl = await fetchRestaurantImage(cardData[currentDataIndex].searchQuery, currentDataIndex);
        const newCard: RevealedCard = {
          id: `card-${totalRevealed}-${Date.now()}`,
          position: { x, y },
          data: cardData[currentDataIndex],
          dataIndex: currentDataIndex,
          imageUrl
        };

        setRevealedCards(prev => {
          // Remove any existing cards with the same data index to prevent duplicates
          const filteredCards = prev.filter(card => card.dataIndex !== currentDataIndex);
          const newCards = [...filteredCards, newCard];
          
          // If we have more than 6 cards, remove the oldest one
          if (newCards.length > 6) {
            newCards.shift(); // Remove first (oldest) card
          }
          return newCards;
        });

        setCurrentDataIndex((currentDataIndex + 1) % cardData.length); // Loop back to start
        setTotalRevealed(prev => prev + 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [clicked, revealedCards, currentDataIndex, totalRevealed]);

  // Calculate which cycle we're in and position within cycle
  const currentCycle = Math.floor(totalRevealed / cardData.length);
  const positionInCycle = (totalRevealed - 1) % cardData.length + 1;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100">
      {/* Landing State: Spline + text.png */}
      <AnimatePresence>
        {!clicked && (
          <motion.div
            key="landing"
            className="absolute inset-0 flex items-center justify-center z-10 bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            onClick={handleClick}
          >
            {/* Spline Coin Background */}
            <div className="absolute inset-0 -z-10">
              <iframe
                src="https://my.spline.design/coin-5yXyiC566EtVJKbHnEsudMB3/"
                frameBorder="0"
                width="100%"
                height="100%"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                allowFullScreen
              />
              {/* White overlay to lighten the coin */}
              <div className="absolute inset-0 bg-white" style={{ opacity: 0.18, pointerEvents: 'none' }} />
            </div>
            {/* Centered text.png */}
            <div className="flex items-center justify-center w-full h-full">
              <Image
                src="/text.png"
                alt="Blackbird Wrapped Text"
                width={800}
                height={400}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* White Page with Sliding Window Cards */}
      <AnimatePresence>
        {clicked && (
                    <motion.div
            key="white-page"
            ref={whitePageRef}
            className="absolute inset-0 bg-gray-100 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Top Title */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
              <h1 className="text-2xl font-serif font-bold text-gray-900 text-center">
                Your 2024 Blackbird Wrapped
              </h1>
            </div>

              {/* Map Feature Coming Soon */}
              <div className="absolute bottom-8 right-8 z-30">
                <span className="text-lg font-serif text-gray-900">
                  Map feature coming soon
                </span>
              </div>

              {/* Simple Counter */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                <span className="text-lg font-serif text-gray-900">
                  {((totalRevealed - 1) % cardData.length) + 1}/20
                </span>
              </div>

              {/* Revealed Cards at Fixed Positions */}
              <AnimatePresence>
              {revealedCards.map((revealedCard, index) => (
                <motion.div
                  key={revealedCard.id}
                  className="absolute rounded-lg overflow-hidden shadow-2xl pointer-events-none"
                  style={{ 
                    width: 'min(52vw, 520px)', // Just a bit larger while maintaining proportion
                    height: '364px', // Maintains the same aspect ratio (520:364 = 10:7)
                    left: revealedCard.position.x,
                    top: revealedCard.position.y,
                    transform: 'translate(-50%, -50%)', // Center on position
                    zIndex: 25 + index // Stack cards properly
                  }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1
                  }}
                  exit={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0,
                    delay: 0
                  }}
                >
                  {/* Dynamic Background Image from Unsplash */}
                  <div className="absolute inset-0">
                    {revealedCard.imageUrl ? (
                      <Image
                        src={revealedCard.imageUrl}
                        alt={`${revealedCard.data.restaurant} Background`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="brightness-75"
                      />
                    ) : (
                      // Fallback to original background while loading
                      <Image
                        src="/background.png"
                        alt="Card Background"
                        fill
                        style={{ objectFit: "cover" }}
                        className="brightness-90"
                      />
                    )}
                  </div>

                  {/* Card Content Overlay */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-4 bg-gradient-to-br from-black/60 via-black/30 to-transparent">
                    {/* Top Section - Title */}
                    <div className="text-right">
                      <h3 className="text-white/90 text-xs font-bold uppercase tracking-wide leading-tight drop-shadow-md font-serif">
                        {revealedCard.data.title}
                      </h3>
                    </div>

                    {/* Bottom Section - Restaurant Details */}
                    <div className="space-y-2">
                      <h2 className="text-white text-4xl font-black leading-none tracking-tight drop-shadow-lg font-serif">
                        {revealedCard.data.restaurant}
                      </h2>
                      <p className="text-white/85 text-sm font-light leading-snug drop-shadow-sm">
                        {revealedCard.data.detail}
                      </p>
                      <div className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 opacity-70"></span>
                        <span className="text-white/70 text-xs font-medium">{revealedCard.data.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

