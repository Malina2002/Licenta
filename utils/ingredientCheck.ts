import ingredientsDB from '../data/ingredients_db.json';

export function classifyIngredients(text: string) {
  const lowerText = text.toLowerCase();
  const found = {
    dangerous: [] as string[],
    borderline: [] as string[],
    safe: [] as string[],
  };

  ingredientsDB.forEach(item => {
    const match = item.aliases.find(alias =>
      lowerText.includes(alias.toLowerCase())
    );

    if (match) {
      found[item.category as 'dangerous' | 'borderline' | 'safe'].push(item.name);
    }
  });

  return found;
}
