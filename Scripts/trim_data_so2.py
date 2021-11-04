import pandas as pd
import csv

def main():
    data1_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42401_2016.csv")
    data2_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42401_2017.csv")
    data3_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42401_2018.csv")
    data4_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42401_2019.csv")
    data5_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42401_2020.csv")

    all_data = pd.concat([data1_no2, data2_no2, data3_no2, data4_no2, data5_no2], axis = 0)

    # The generateUniqueCode functions return the data with county codes and site codes replaced in the data 
    all_data = generateUniqueCountyCode(all_data)
    all_data = generateUniqueSiteCode(all_data)

    print('Starting grouping of all data!')

    data = all_data.groupby(['State Code', 'County Code', 'Date Local'])

    print('Grouped all data per county!')

    final_result = []

    # iterate over each group
    for group_name, df_group in data:
        considered_duration = ''
        row_to_consider = []

        for row_index, row in df_group.iterrows():
            sampleDuration = row['Sample Duration']
            if len(row_to_consider) == 0:
                row_to_consider = row
                considered_duration = sampleDuration

            if sampleDuration == '1 HOUR':
                considered_duration = '1 HOUR'
                row_to_consider = row
                break

            if sampleDuration == '8-HR RUN AVG END HOUR':
                if considered_duration != '1 HOUR':
                    considered_duration = '8-HR RUN AVG END HOUR'
                    row_to_consider = row

            if sampleDuration == '8-HR RUN AVG BEGIN HOUR':
                if considered_duration != '1 HOUR':
                    considered_duration = '8-HR RUN AVG BEGIN HOUR'
                    row_to_consider = row

        final_result.append(row_to_consider)
    
    print('Added all relevant data to final_result')

    ##################### correct till here #################

    ##########CHANGE FILE NAME TO BE CREATED FOR EACH POLLUTANT##############
        
    temp = open('so2Temp.csv', 'w')          #change file name for pollutant
    header = ''
    for row in all_data[:1]:
        header += str(row) + ','
    header = header[:-1]
    temp.write(header + '\n')

    string_keys = [1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 20, 21, 22, 23]   #String values to be inserted in the query as 'strings'

    #15 lakh increments no2->ozone->so2->co2
    i = 3000000 #will start with multiples of 15lakh

    for row in final_result:
        s = '{},'.format(i)
        for key, val in enumerate(row):
            if key in string_keys:
                append_str = '\'{}\','.format(val)
            else :
                append_str = '{},'.format(val)
            s = s + append_str
        s = s[:-1]
        temp.write(s + '\n')
        i = i+1


##############GENERATE UNIQUE STATE AND COUNTY CODES##################
def generateUniqueCountyCode(all_data):
    state_array = all_data.iloc[:]['State Code']
    county_array = all_data.iloc[:]['County Code']
    site_array = all_data.iloc[:]['Site Num']
    countyCodes = []
    siteCodes = []

    for (a, b, c) in zip(state_array, county_array, site_array):
        countyCodes.append(str(a)+'St'+str(b)+'Co')
    
    print('found all County Codes all Data!')
    all_data['County Code'] = countyCodes
    print('replaced all County Codes all Data!')
    countyCodes = []
    return all_data


def generateUniqueSiteCode(all_data):    
    state_array = all_data.iloc[:]['State Code']
    county_array = all_data.iloc[:]['County Code']
    site_array = all_data.iloc[:]['Site Num']

    siteCodes = []

    for (a, b, c) in zip(state_array, county_array, site_array):
        siteCodes.append(str(a)+'St'+str(b)+'Co'+str(c)+'Si')

    print('found all Site Codes all Data!')

    # import ipdb; ipdb.set_trace();
    all_data['Site Code'] = siteCodes

    print('replaced all Site Codes all Data!')

    siteCodes = []
    return all_data


main()