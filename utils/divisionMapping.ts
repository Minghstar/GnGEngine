// Division mapping for Australian college athletes
// Maps college names to their NCAA divisions and other athletic associations

export interface DivisionInfo {
  division: string;
  association: string;
  fullName: string;
}

// NCAA Division I Colleges
const D1_COLLEGES = new Set([
  // ACC
  'Boston College', 'Clemson University', 'Duke University', 'Florida State University',
  'Georgia Institute of Technology', 'University of Louisville', 'University of Miami',
  'University of North Carolina', 'North Carolina State University', 'University of Notre Dame',
  'University of Pittsburgh', 'Syracuse University', 'University of Virginia', 'Virginia Tech',
  'Wake Forest University',
  
  // Big 12
  'Baylor University', 'Iowa State University', 'Kansas State University', 'University of Kansas',
  'University of Oklahoma', 'Oklahoma State University', 'University of Texas', 'Texas Christian University',
  'Texas Tech University', 'West Virginia University',
  
  // Big Ten
  'University of Illinois', 'Indiana University', 'University of Iowa', 'University of Maryland',
  'University of Michigan', 'Michigan State University', 'University of Minnesota', 'University of Nebraska',
  'Northwestern University', 'Ohio State University', 'Penn State University', 'Purdue University',
  'Rutgers University', 'University of Wisconsin',
  
  // Pac-12
  'University of Arizona', 'Arizona State University', 'University of California, Berkeley',
  'University of California, Los Angeles', 'University of Colorado Boulder', 'University of Oregon',
  'Oregon State University', 'University of Southern California', 'Stanford University',
  'University of Utah', 'University of Washington', 'Washington State University',
  
  // SEC
  'University of Alabama', 'University of Arkansas', 'Auburn University', 'University of Florida',
  'University of Georgia', 'University of Kentucky', 'Louisiana State University', 'University of Mississippi',
  'Mississippi State University', 'University of Missouri', 'University of South Carolina',
  'University of Tennessee', 'Texas A&M University', 'Vanderbilt University',
  
  // American Athletic Conference
  'University of Cincinnati', 'University of Connecticut', 'East Carolina University',
  'University of Houston', 'University of Memphis', 'University of South Florida',
  'Southern Methodist University', 'Temple University', 'Tulane University', 'University of Tulsa',
  'University of Central Florida', 'Wichita State University',
  
  // Mountain West
  'Air Force Academy', 'Boise State University', 'Colorado State University', 'Fresno State University',
  'University of Hawaii', 'University of Nevada, Las Vegas', 'University of New Mexico',
  'San Diego State University', 'San Jose State University', 'University of Nevada, Reno',
  'Utah State University', 'Wyoming University',
  
  // Conference USA
  'Florida Atlantic University', 'Florida International University', 'Louisiana Tech University',
  'Marshall University', 'Middle Tennessee State University', 'University of North Texas',
  'Old Dominion University', 'Rice University', 'University of Southern Mississippi',
  'University of Texas at El Paso', 'University of Texas at San Antonio', 'Western Kentucky University',
  
  // MAC
  'University of Akron', 'Ball State University', 'Bowling Green State University',
  'University of Buffalo', 'Central Michigan University', 'Eastern Michigan University',
  'Kent State University', 'Miami University', 'Northern Illinois University',
  'Ohio University', 'University of Toledo', 'Western Michigan University',
  
  // Sun Belt
  'Appalachian State University', 'Arkansas State University', 'Coastal Carolina University',
  'Georgia Southern University', 'Georgia State University', 'University of Louisiana at Lafayette',
  'University of Louisiana at Monroe', 'University of South Alabama', 'Texas State University',
  'Troy University', 'University of Texas at Arlington',
  
  // Independent
  'Brigham Young University', 'University of Massachusetts', 'University of Notre Dame',
  'United States Military Academy', 'United States Naval Academy', 'United States Air Force Academy',
  'Liberty University', 'New Mexico State University', 'University of Connecticut'
]);

// NCAA Division II Colleges
const D2_COLLEGES = new Set([
  // Common D2 colleges
  'Adams State University', 'Alaska Anchorage', 'American International College',
  'Angelo State University', 'Ashland University', 'Augustana University',
  'Bentley University', 'Bloomsburg University', 'California State University, Chico',
  'California State University, San Bernardino', 'Central Washington University',
  'Chadron State College', 'Colorado Mesa University', 'Colorado School of Mines',
  'Concordia University, St. Paul', 'Davenport University', 'Delta State University',
  'East Stroudsburg University', 'Emporia State University', 'Ferris State University',
  'Florida Southern College', 'Fort Hays State University', 'Fort Lewis College',
  'Grand Valley State University', 'Harding University', 'Humboldt State University',
  'Indiana University of Pennsylvania', 'Kutztown University', 'Lander University',
  'Lenoir-Rhyne University', 'Limestone University', 'Lincoln Memorial University',
  'Lindenwood University', 'Lock Haven University', 'Mars Hill University',
  'Mercyhurst University', 'Michigan Technological University', 'Minnesota State University, Mankato',
  'Minnesota State University, Moorhead', 'Missouri Southern State University',
  'Missouri Western State University', 'Montana State University Billings',
  'Newberry College', 'North Greenville University', 'Northern Michigan University',
  'Northwest Missouri State University', 'Nova Southeastern University',
  'Ohio Dominican University', 'Oklahoma Baptist University', 'Ouachita Baptist University',
  'Pittsburg State University', 'Point Loma Nazarene University', 'Queens University of Charlotte',
  'Regis University', 'Rockhurst University', 'Rollins College', 'Saint Leo University',
  'Saint Michael\'s College', 'Seton Hill University', 'Shippensburg University',
  'Slippery Rock University', 'Sonoma State University', 'South Dakota School of Mines',
  'Southern Arkansas University', 'Southern New Hampshire University', 'Southwest Baptist University',
  'Stonehill College', 'Tarleton State University', 'Texas A&M University-Commerce',
  'Texas A&M University-Kingsville', 'Tiffin University', 'University of Alaska Fairbanks',
  'University of Central Missouri', 'University of Charleston', 'University of Colorado Colorado Springs',
  'University of Findlay', 'University of Indianapolis', 'University of Mary',
  'University of Minnesota Duluth', 'University of Montevallo', 'University of Nebraska at Kearney',
  'University of North Alabama', 'University of North Georgia', 'University of Sioux Falls',
  'University of Tampa', 'University of West Alabama', 'University of West Florida',
  'Walsh University', 'Wayne State University', 'West Chester University',
  'West Liberty University', 'Western Oregon University', 'Western Washington University',
  'Wingate University', 'Young Harris College'
]);

// NCAA Division III Colleges
const D3_COLLEGES = new Set([
  // Common D3 colleges
  'Albion College', 'Allegheny College', 'Amherst College', 'Augsburg University',
  'Babson College', 'Bates College', 'Beloit College', 'Bethel University',
  'Bowdoin College', 'Brandeis University', 'Bridgewater College', 'Carleton College',
  'Carnegie Mellon University', 'Case Western Reserve University', 'Centre College',
  'Claremont McKenna College', 'Clark University', 'Colby College', 'Colgate University',
  'College of Wooster', 'Colorado College', 'Connecticut College', 'Cornell College',
  'DePauw University', 'Dickinson College', 'Earlham College', 'Elizabethtown College',
  'Emory University', 'Franklin & Marshall College', 'Gettysburg College', 'Gustavus Adolphus College',
  'Hamilton College', 'Hampden-Sydney College', 'Haverford College', 'Hendrix College',
  'Hobart and William Smith Colleges', 'Hope College', 'Illinois Wesleyan University',
  'Johns Hopkins University', 'Kalamazoo College', 'Kenyon College', 'Lafayette College',
  'Lawrence University', 'Lehigh University', 'Lewis & Clark College', 'Macalester College',
  'Massachusetts Institute of Technology', 'Middlebury College', 'Millsaps College',
  'Mount Holyoke College', 'Muhlenberg College', 'New York University', 'North Central College',
  'Oberlin College', 'Occidental College', 'Ohio Wesleyan University', 'Pomona College',
  'Purdue University Northwest', 'Reed College', 'Rhodes College', 'Ripon College',
  'Rochester Institute of Technology', 'Rowan University', 'Saint John\'s University',
  'Saint Mary\'s College', 'Saint Olaf College', 'Scripps College', 'Sewanee: The University of the South',
  'Skidmore College', 'Smith College', 'St. Lawrence University', 'St. Thomas University',
  'Stevens Institute of Technology', 'Swarthmore College', 'Trinity College',
  'Tufts University', 'Union College', 'University of Chicago', 'University of Rochester',
  'University of St. Thomas', 'Vassar College', 'Wabash College', 'Washington and Lee University',
  'Wellesley College', 'Wesleyan University', 'Wheaton College', 'Williams College',
  'Wittenberg University', 'Worcester Polytechnic Institute'
]);

// NAIA Colleges
const NAIA_COLLEGES = new Set([
  'Aquinas College', 'Arizona Christian University', 'Baker University', 'Bellevue University',
  'Bethel College', 'Briar Cliff University', 'Bryan College', 'Campbellsville University',
  'Carroll College', 'Central Methodist University', 'Columbia College', 'Concordia University',
  'Corban University', 'Cumberland University', 'Dakota Wesleyan University', 'Davenport University',
  'Doane University', 'Eastern Oregon University', 'Embry-Riddle Aeronautical University',
  'Evangel University', 'Faulkner University', 'Freed-Hardeman University', 'Georgetown College',
  'Graceland University', 'Grand View University', 'Hastings College', 'Indiana Wesleyan University',
  'John Brown University', 'Kansas Wesleyan University', 'Lindsey Wilson College',
  'Loyola University New Orleans', 'Madonna University', 'Marian University',
  'MidAmerica Nazarene University', 'Midland University', 'Missouri Baptist University',
  'Montana Tech', 'Mount Mercy University', 'Northwestern College', 'Oklahoma City University',
  'Olivet Nazarene University', 'Park University', 'Point University', 'Purdue University Northwest',
  'Reinhardt University', 'Saint Ambrose University', 'Saint Francis University',
  'Saint Mary University', 'Saint Xavier University', 'Siena Heights University',
  'Simpson University', 'Southeastern University', 'Southern Oregon University',
  'Southwestern College', 'Spring Arbor University', 'Sterling College', 'Taylor University',
  'Tennessee Wesleyan University', 'Texas Wesleyan University', 'Thomas More University',
  'University of Jamestown', 'University of Mobile', 'University of Saint Francis',
  'University of Science and Arts of Oklahoma', 'University of the Cumberlands',
  'Valley City State University', 'Viterbo University', 'Waldorf University',
  'Warner University', 'Wayland Baptist University', 'William Carey University',
  'William Penn University', 'William Woods University'
]);

// NJCAA Colleges
const NJCAA_COLLEGES = new Set([
  'Arizona Western College', 'Blinn College', 'Butler Community College',
  'Central Arizona College', 'Cisco College', 'Coffeyville Community College',
  'Dodge City Community College', 'Eastern Arizona College', 'Fort Scott Community College',
  'Garden City Community College', 'Glendale Community College', 'Hutchinson Community College',
  'Independence Community College', 'Iowa Western Community College', 'Kilgore College',
  'Lackawanna College', 'Lamar Community College', 'Mesa Community College',
  'Northeastern Oklahoma A&M College', 'Northwest Mississippi Community College',
  'Odessa College', 'Phoenix College', 'Pima Community College', 'Scottsdale Community College',
  'Seward County Community College', 'Snow College', 'Tyler Junior College',
  'Trinidad State Junior College', 'Ventura College', 'Western Texas College'
]);

// Helper function to normalize college names for matching
function normalizeCollegeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/university|college|institute|school/gi, '')
    .replace(/[.,&]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Main function to determine division
export function getDivisionInfo(collegeName: string): DivisionInfo {
  if (!collegeName) {
    return {
      division: 'Unknown',
      association: 'Unknown',
      fullName: 'Unknown Division'
    };
  }

  const normalizedName = normalizeCollegeName(collegeName);
  
  // Check each division set
  if (D1_COLLEGES.has(collegeName)) {
    return {
      division: 'D1',
      association: 'NCAA',
      fullName: 'NCAA Division I'
    };
  }
  
  if (D2_COLLEGES.has(collegeName)) {
    return {
      division: 'D2',
      association: 'NCAA',
      fullName: 'NCAA Division II'
    };
  }
  
  if (D3_COLLEGES.has(collegeName)) {
    return {
      division: 'D3',
      association: 'NCAA',
      fullName: 'NCAA Division III'
    };
  }
  
  if (NAIA_COLLEGES.has(collegeName)) {
    return {
      division: 'NAIA',
      association: 'NAIA',
      fullName: 'NAIA'
    };
  }
  
  if (NJCAA_COLLEGES.has(collegeName)) {
    return {
      division: 'NJCAA',
      association: 'NJCAA',
      fullName: 'NJCAA'
    };
  }

  // Fuzzy matching for partial matches
  const allColleges = [
    ...Array.from(D1_COLLEGES).map(name => ({ name, division: 'D1', association: 'NCAA', fullName: 'NCAA Division I' })),
    ...Array.from(D2_COLLEGES).map(name => ({ name, division: 'D2', association: 'NCAA', fullName: 'NCAA Division II' })),
    ...Array.from(D3_COLLEGES).map(name => ({ name, division: 'D3', association: 'NCAA', fullName: 'NCAA Division III' })),
    ...Array.from(NAIA_COLLEGES).map(name => ({ name, division: 'NAIA', association: 'NAIA', fullName: 'NAIA' })),
    ...Array.from(NJCAA_COLLEGES).map(name => ({ name, division: 'NJCAA', association: 'NJCAA', fullName: 'NJCAA' }))
  ];

  // Try to find partial matches
  for (const college of allColleges) {
    const normalizedCollegeName = normalizeCollegeName(college.name);
    if (normalizedCollegeName.includes(normalizedName) || normalizedName.includes(normalizedCollegeName)) {
      return {
        division: college.division,
        association: college.association,
        fullName: college.fullName
      };
    }
  }

  // Default to unknown if no match found
  return {
    division: 'Unknown',
    association: 'Unknown',
    fullName: 'Unknown Division'
  };
}

// Utility function to get all divisions for filtering
export function getAllDivisions(): string[] {
  return ['D1', 'D2', 'D3', 'NAIA', 'NJCAA', 'Unknown'];
}

// Utility function to get all associations for filtering
export function getAllAssociations(): string[] {
  return ['NCAA', 'NAIA', 'NJCAA', 'Unknown'];
} 