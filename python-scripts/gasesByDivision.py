import pandas as pd
import matplotlib.pyplot as plt

# Load the dataset
data = pd.read_csv('./python-scripts/data_set.csv')

# Convert start_time to datetime format
data['start_time'] = pd.to_datetime(data['start_time'])

# Filter data for ch4 emissions
ch4_data = data[data['gas'] == 'ch4']
co2_data = data[(data['gas'] == 'co2')]
n2o_data = data[data['gas'] == 'n2o']

gases = [ch4_data , co2_data , n2o_data]
gasesNames = ["CH4" , "CO2" , "N2O"]
counter = 0


lst = ['Okara Urban Area in Lahore Division','Gujranwala Urban Area in Gujranwala Division', 'Rawalpindi [Islamabad] Urban Area in Rawalpindi Division', 
       'Sialkot Urban Area in Gujranwala Division','Hyderabad Urban Area in Hyderabad Division','Sargodha Urban Area in Sargodha Division',
       'Rahimyar Khan Urban Area in Bahawalpur Division','Quetta Urban Area in Quetta Division',
       'Dera Ghazi Khan Urban Area in Dera Ghazi Khan Division','Swabi Urban Area in Mardan Division','Bhawal Urban Area in Sargodha Division',
       'Palandri Urban Area in Azad Kashmir Division', 'Haripur Urban Area in Hazara Division','Daharki Urban Area in Sukkur Division','Chitral Urban Area in Malakand Division','Peshawar Urban Area in F.A.T.A. Division']

divShortName = ['Okara', 'Gujranwala', 'Rawalpindi', 'Sialkot', 'Hyderabad', 'Sargodha', 'Rahimyar', 'Quetta', 'Dera', 'Swabi', 'Bhawal', 'Palandri', 'Haripur', 'Daharki', 'Chitral', 'Peshawar']

for gas in gases:
    for i in range (len(lst)):

        # Specify the source name you want to visualize
        source_name_to_plot = lst[i]  # Change this to your desired source name

        # Filter data for the specified source name
        source_data = gas[gas['source_name'] == source_name_to_plot]
        if source_data.empty:
            print(f"No {gasesNames[counter]} emissions data found for {source_name_to_plot}.")
        else:
            # Group by start_time and sum emissions_quantity
            gas_summary = source_data.groupby('start_time')['emissions_quantity'].sum().reset_index()

        # Set the figure size for better visibility
        plt.figure(figsize=(11, 5))

        # Create a line plot for the specified source name
        plt.plot(gas_summary['start_time'], gas_summary['emissions_quantity'], marker='o', color='b')

        # Add titles and labels
        plt.title(f'{gasesNames[counter]} Emissions Over Time for {source_name_to_plot}', fontsize=16)
        plt.xlabel('Time', fontsize=12)
        plt.ylabel(f'Total Emissions Quantity (T of {gasesNames[counter]})', fontsize=12)
        plt.xticks(rotation=45)
        plt.grid()

        # Show the plot
        plt.tight_layout()
        plt.savefig(f'./public/assets/{divShortName[i]}_{gasesNames[counter]}.png')
    
    counter+=1