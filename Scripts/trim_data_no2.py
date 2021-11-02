import pandas as pd
import csv

def main():
    data1_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42602_2016.csv")
    data2_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42602_2017.csv")
    data3_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42602_2018.csv")
    data4_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42602_2019.csv")
    data5_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_42602_2020.csv")

    all_data = pd.concat([data1_no2, data2_no2, data3_no2, data4_no2, data5_no2], axis = 0)

    data = all_data.groupby(['State Code', 'County Code', 'Date Local'])

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

    ##################### correct till here #################
        
    coTemp = open('coTemp.csv', 'w')
    header = ''
    for row in all_data[:1]:
        header += str(row) + ','
    header = header[:-1]
    coTemp.write(header + '\n')

    string_keys = [12, 23, 22, 21, 20, 11, 10, 9, 8, 7, 6, 5]
    i=0

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
    data1_no2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/daily_44201_2016.csv", low_memory=False)

    # header = ''
    # for row in data1_no2[:1]:
    #     header += str(row) + ','
    # header = header[:-1]

    all_data_changed = pd.read_csv('coTemp.csv', low_memory=False)
    no2_1 = open('no2_1.csv', 'a')
    no2_2 = open('no2_2.csv', 'a')

    # no2_1.write(header + '\n')
    # no2_2.write(header + '\n')

    with open('coTemp.csv') as inf, open('no2_1.csv','w') as of1, open('no2_2.csv','w') as of2:
        outf = of1
        for line in inf:
            if 'karan' in line:
                outf = of2
                continue  # prevent output of the line with "string pattern" 
            outf.write(line)

    # i = 0
    # print('length of all data changed - ' + str(len(all_data_changed)))
    # for row in all_data_changed:
    #     i = i+1
    #     s = ''
    #     for x in row:
    #         s = s + x

    #     if i < 10:
    #         print(s)

    #     if i < len(all_data_changed)//2:
    #         no2_1.write(s)
    #     else:
    # no2_2.write(s)
    
def convert_to_sql():
    # co2016 = pd.read_csv('coTemp.csv', error_bad_lines=False)
    no2_1 = pd.read_csv('no2__final_1.csv', error_bad_lines=False)
    no2_1 = no2_1[1:]
    # header = ''

    # for row in co2016[:1]:
    #     header += str(row) + ','
    
    # # print(header)
    
    # co2016['Units of Measure'] = co2016['Units of Measure'].astype("string")

    # print(co2016.info())

    # for converting csv to sql text, all columns and commas to be added
    
    for ndx, row in no2_1.iterrows():
        print('INSERT INTO TABLE VALUES (' + str(row['State Code']) + str(row['County Code'])+ str(row['Site Num'])+ str(row['Parameter Code'])+ str(row['POC'])+ ')\n')
        if ndx > 20:
            break



main()