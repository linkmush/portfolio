import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const galleryItems = [
  {
    title: "Interior",
    description: "Our elegant dining room",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&q=80"
  },
  {
    title: "Signature Dish",
    description: "Chef's special creation",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&q=80"
  },
  {
    title: "Private Events",
    description: "Perfect for special occasions",
    imageUrl: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&h=600&q=80"
  },
  {
    title: "Bar",
    description: "Extensive wine and cocktail selection",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&q=80"
  },
  {
    title: "Outdoor Seating",
    description: "Al fresco dining experience",
    imageUrl: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&q=80"
  },
  {
    title: "Kitchen",
    description: "Where the magic happens",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&q=80"
  }
]

export const Gallery = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Our Gallery</CardTitle>
          <CardDescription>
            Take a visual tour of our restaurant and cuisine
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <AspectRatio ratio={4/3}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </AspectRatio>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
