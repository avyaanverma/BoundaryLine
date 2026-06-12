function ApiUsageCard() {
    const services = [
        {
            name: "Live Score Engine",
            value: 88,
            color: "bg-lime-400",
        },
        {
            name: "Historical Data API",
            value: 42,
            color: "bg-green-200",
        },
        {
            name: "User Auth Service",
            value: 65,
            color: "bg-pink-300",
        },
        {
            name: "Media Content Delivery",
            value: 21,
            color: "bg-gray-300",
        },
    ];

    return (
        <div className="bg-[#18191d] border border-gray-700 rounded-xl p-6">
            <h2 className="text-3xl font-semibold text-white mb-8">
                API Usage by Service
            </h2>

            <div className="space-y-8">
                {services.map((service) => (
                    <div key={service.name}>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-300">
                                {service.name}
                            </span>

                            <span className="text-white">
                                {service.value}%
                            </span>
                        </div>

                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${service.color}`}
                                style={{
                                    width: `${service.value}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApiUsageCard;