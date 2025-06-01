import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {wp} from '../../config/dimension';
import colors from '../../config/colors';
import fonts from '../../config/fonts';
import {NewsListCard} from './component/NewsListCard';
import {createThumbnail} from 'react-native-create-thumbnail';

function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    getTodayNews();
  }, []);
  const getTodayNews = () => {
    fetch(
      'https://newsapi.org/v2/top-headlines/sources?apiKey=e3c0fd88884e46af97d3ce2be113ef69',
    )
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        // console.log(JSON.stringify(data, null, 2));
        setNewsData(data.sources);
      })
      .catch(error => console.error('Error fetching hourly weather:', error));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News</Text>
        <IconButton
          icon="filter-outline"
          size={wp(28)}
          iconColor={colors.primaryText}
          onPress={() => {}}
        />
      </View>
      <FlatList
        data={newsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <NewsListCard data={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    paddingVertical: wp(16),
  },
  headerTitle: {
    fontSize: wp(24),
    color: colors.primaryText,
    fontFamily: fonts.GloryBold,
  },
  listContent: {
    paddingHorizontal: wp(20),
    gap: wp(20),
  },
});

export default News;
