import ingredientsDB from '../data/ingredients_db.json';

export function classifyIngredients(text: string, userAllergies: string[] = []) {
  const lowerText = text.toLowerCase();
  const found = {
    dangerous: [] as string[],
    borderline: [] as string[],
    safe: [] as string[],
    allergens: [] as string[],
  };

  ingredientsDB.forEach(item => {
    const match = item.aliases.find(alias =>
      lowerText.includes(alias.toLowerCase())
    );

    if (match) {
      const category = item.category as 'dangerous' | 'borderline' | 'safe';
      found[category].push(item.name);
    }
  });

  userAllergies.forEach(allergen => {
    if (lowerText.includes(allergen.toLowerCase()) && !found.allergens.includes(allergen)) {
      found.allergens.push(allergen);
    }
  });

  return found;
}
