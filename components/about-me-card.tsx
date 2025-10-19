import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface AboutMeCardProps {
  cgpa: number;
  year: string;
  githubAuthor: string;
}

const AboutMeCard: React.FC<AboutMeCardProps> = ({ cgpa, year, githubAuthor }) => {
  const [githubCommits, setGithubCommits] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  useEffect(() => {
    const fetchGithubCommits = async () => {
      try {
        const response = await fetch(`https://api.github.com/search/commits?q=author:${githubAuthor}`);
        const data = await response.json();
        setGithubCommits(data.total_count);
      } catch (error) {
        console.error('Error fetching GitHub commits:', error);
      }
    };

    fetchGithubCommits();
  }, [githubAuthor]);

  const AnimatedNumber = ({ from, to, duration, fixed }: { from: number; to: number; duration: number; fixed?: number }) => {
    const [current, setCurrent] = useState(from);

    useEffect(() => {
      let start: number | null = null;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / (duration * 1000);
        setCurrent(Math.min(to, from + progress * (to - from)));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      if (isInView) {
        requestAnimationFrame(animate);
      }
    }, [from, to, duration, isInView]);

    return <>{fixed ? current.toFixed(fixed) : Math.round(current)}</>;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={mainControls}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: 0.25 }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(0, 255, 255, 0.4)" }}
      className="bg-black/40 border border-cyan-500/30 rounded-lg p-8 backdrop-blur-sm shadow-lg cursor-pointer"
    >
      <h3 className="text-3xl font-bold text-center text-cyan-400 mb-6">
        ABOUT ME
      </h3>
      <div className="text-lg leading-relaxed space-y-4 text-gray-300">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My name is <span className="text-cyan-400 font-semibold">Shaikh Mohammad Warsi</span>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          I am from <span className="text-orange-400 font-semibold">Indore</span>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          My current CGPA is <span className="text-green-400 font-semibold"><AnimatedNumber from={0} to={cgpa} duration={0.8} fixed={1} /></span>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          I am in my <span className="text-blue-400 font-semibold">{year}</span> year of study at <span className="text-blue-400 font-semibold">VIT Bhopal</span>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          I have made over <span className="text-purple-400 font-semibold"><AnimatedNumber from={0} to={githubCommits} duration={1} />+</span> commits on GitHub.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AboutMeCard;