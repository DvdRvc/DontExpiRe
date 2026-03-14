const emojis = ["🥬", "🍎", "🥕", "🍞", "🥛", "🍌", "🍓", "🍇", "🥦"];

const items = Array.from({ length: 35 }, (_, index) => ({
    emoji: emojis[index % emojis.length],
    top: `${(index * 13) % 95}%`,
    left: `${(index * 17) % 95}%`,
    animation:
        index % 3 === 0
            ? "animate-floatSlow"
            : index % 3 === 1
                ? "animate-floatMedium"
                : "animate-floatFast",
    size:
        index % 3 === 0
            ? "text-3xl"
            : index % 3 === 1
                ? "text-4xl"
                : "text-5xl",
}));

export default function FloatingFoods() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
            {items.map((item, index) => (
                <span
                    key={index}
                    className={`absolute ${item.size} opacity-10 select-none ${item.animation}`}
                    style={{
                        top: item.top,
                        left: item.left,
                    }}
                >
          {item.emoji}
        </span>
            ))}
        </div>
    );
}