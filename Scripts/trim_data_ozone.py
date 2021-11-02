import pandas as pd
import csv

def main():
    data1_ozone = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_44201_2016.csv")
    data2_ozone = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_44201_2017.csv")
    data3_ozone = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_44201_2018.csv")
    data4_ozone = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_44201_2019.csv")
    data5_ozone = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_44201_2020.csv")

    all_data = pd.concat([data1_ozone, data2_ozone, data3_ozone, data4_ozone, data5_ozone], axis = 0)
    
    print('Concatenated all Data!')

    # import ipdb; ipdb.set_trace();

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
    
    for (a, b, c) in zip(state_array, county_array, site_array):
        siteCodes.append(str(a)+'St'+str(b)+'Co'+str(c)+'Si')

    print('found all County Codes all Data!')

    # import ipdb; ipdb.set_trace();
    all_data['Site Code'] = siteCodes

    print('replaced all Site Codes all Data!')

    siteCodes = []

    data = all_data.groupby(['State Code', 'County Code', 'Date Local'])

    final_result = []

    # iterate over each group
    for group_name, df_group in data:
        considered_duration = ''
        row_to_consider = []

        for row_index, row in df_group.iterrows():
            sampleDuration = row['Sample Duration']
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
        
        if len(row_to_consider) == 0:

            row_to_consider = df_group.iterrows()[0]

        final_result.append(row_to_consider)

    ##################### correct till here #################
        
    coTemp = open('coTemp.csv', 'w')
    header = ''
    for row in all_data[:1]:
        header += str(row) + ','
    header = header[:-1]
    coTemp.write(header + '\n')

    string_keys = [12, 23, 22, 21, 20, 11, 10, 9, 8, 7, 6, 5]
    i=150000

    # Create the Site Codes

    # new_site_code --> state_code + "S" + county_code + "C" + site_number
    # new_county_code --> state_code + "S" + county_code

    for row in final_result:
        s = '{},'.format(i)
        for key, val in enumerate(row):
            if key in string_keys:
                append_str = '\'{}\','.format(val)
            else :
                append_str = '{},'.format(val)
            # print('key -> ' + str(key))
            # append_str = '\'{}\','.format(val)
            s = s + append_str
        s = s[:-1]
        coTemp.write(s + '\n')
        i = i+1
    
    ##################### correct till here #################

    divide_data_into_2_files()

def divide_data_into_2_files():
    data1_ozone = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_44201_2016.csv", low_memory=False)

    # header = ''
    # for row in data1_ozone[:1]:
    #     header += str(row) + ','
    # header = header[:-1]

    all_data_changed = pd.read_csv('coTemp.csv', low_memory=False)
    ozone1 = open('ozone1.csv', 'a')
    ozone2 = open('ozone2.csv', 'a')

    # ozone1.write(header + '\n')
    # ozone2.write(header + '\n')

    with open('coTemp.csv') as inf, open('ozone1.csv','w') as of1, open('ozone2.csv','w') as of2:
        outf = of1
        for line in inf:
            if 'karan' in line:
                outf = of2
                continue  # prevent output of the line with "string pattern" 
            outf.write(line)
    
def convert_to_sql():
    ozone1 = pd.read_csv('ozone_final_1.csv', error_bad_lines=False)
    ozone1 = ozone1[1:]
     
    for ndx, row in ozone1.iterrows():
        print('INSERT INTO TABLE VALUES (' + str(row['State Code']) + str(row['County Code'])+ str(row['Site Num'])+ str(row['Parameter Code'])+ str(row['POC'])+ ')\n')
        if ndx > 20:
            break

main()