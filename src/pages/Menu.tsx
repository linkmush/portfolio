import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const menuCategories = [
  {
    id: "starters",
    name: "Starters",
    items: [
      { name: "Bruschetta", price: "8.99", description: "Toasted bread with fresh tomatoes and basil" },
      { name: "Calamari", price: "12.99", description: "Crispy fried squid with marinara sauce" },
      { name: "Soup of the Day", price: "6.99", description: "Ask your server for today's selection" },
    ]
  },
  {
    id: "main-courses",
    name: "Main Courses",
    items: [
      { name: "Grilled Salmon", price: "24.99", description: "Fresh salmon with seasonal vegetables" },
      { name: "Beef Tenderloin", price: "29.99", description: "8oz tenderloin with red wine sauce" },
      { name: "Vegetable Risotto", price: "18.99", description: "Creamy risotto with seasonal vegetables" },
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "Tiramisu", price: "8.99", description: "Classic Italian dessert" },
      { name: "Chocolate Fondant", price: "9.99", description: "Warm chocolate cake with vanilla ice cream" },
      { name: "Crème Brûlée", price: "7.99", description: "Classic French vanilla custard" },
    ]
  }
]

export const Menu = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Our Menu</CardTitle>
          <CardDescription>
            Explore our carefully curated selection of dishes
          </CardDescription>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {menuCategories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="text-xl">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                {category.items.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-lg">
                          ${item.price}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

