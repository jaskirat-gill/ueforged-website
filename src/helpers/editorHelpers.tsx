// Group object by key.
export const groupObjectByKey = (object: Record<string, any>, key: string) => {
  const groups: Record<string, string[]> = {};
  // Loop through object keys.
  for (const id of Object.keys(object)) {
    const type = object[id][key];
    // Create group key if it doesn't exist.
    if (!groups[type]) groups[type] = [];
    // Push item to group.
    groups[type].push(id);
  }
  return groups;
};

// Select list grouped by provided type.
export const GroupedSelect: React.FC<{
  value: string | undefined;
  itemList: Record<string, any>;
  groupBy: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ value, itemList, groupBy, ...restProps }) => {
  // Get list sorted by type.
  const groupedList = groupObjectByKey(itemList, groupBy);

  return (
    <select value={value || ""} {...restProps}>
      {Object.keys(groupedList).map((type) => (
        <optgroup key={type} label={type}>
          {groupedList[type].map((id) => (
            <option key={id} value={id}>
              {itemList[id].name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

// Select list of different ranges in inches.
export const InchRangeSelect: React.FC<{
  value: number | undefined;
  min: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ value, min, max, ...restProps }) => {
  let elements: JSX.Element[] = [];

  // Build options.
  for (let i = min; i <= max; i++) {
    elements.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <select value={value || 0} {...restProps}>
      {elements}
    </select>
  );
};

export const WheelWidthSelect: React.FC<{
  value: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ value, ...restProps }) => {
  let elements: JSX.Element[] = [];
  const options = [205, 225, 245, 255, 275, 285, 305, 315, 345];

  for (const option of options) {
    elements.push(
      <option key={option} value={option}>
        {option}
        mm
      </option>
    );
  }

  return (
    <select value={value} {...restProps}>
      {elements}
    </select>
  );
};

export const TireAspectSelect: React.FC<{
  value: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ value, ...restProps }) => {
  let elements: JSX.Element[] = [];
  const options = [20,25,30,35,40,45,50,55,60];

  for (const option of options) {
    elements.push(
      <option key={option} value={option}>
        {option}
      </option>
    );
  }

  return (
    <select value={value} {...restProps}>
      {elements}
    </select>
  );
};
