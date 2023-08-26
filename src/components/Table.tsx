export default function Table(inputs: any) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left text-white-500">
        <thead className="text-xs text-gray-100 uppercase bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Item
            </th>
            <th scope="col" className="px-6 py-3">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(inputs.inputs).map((item) => (
            <tr
              key={item}
              className="bg-gray-600 text-gray-100 border-b border-gray-500"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {item}
              </th>
              <td className="px-6 py-4">{inputs.inputs[item]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
