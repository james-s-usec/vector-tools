import React, { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useEquipment } from '@hvac/hooks/useEquipment';
import { ProjectContext } from '../../App';
import { GridContainer, GridItem } from '@hvac/ui';
 
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress,
  Paper,
  Alert,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Equipment } from '@hvac/types';

const EquipmentSelectionPage: React.FC = () => {
  const selectedProject = useContext(ProjectContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('tag');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid
  
  // For mobile view
  const [showFilters, setShowFilters] = useState(false);
  
  const { 
    data: equipment = [], 
    isLoading, 
    error 
  } = useEquipment(selectedProject ?? undefined);

  // Extract unique categories and locations for filters
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    equipment.forEach(item => {
      if (item.category?.name) {
        uniqueCategories.add(item.category.name);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [equipment]);
  
  const locations = useMemo(() => {
    const uniqueLocations = new Set<string>();
    equipment.forEach(item => {
      if (item.location) {
        const locationString = `${item.location.buildingName}, ${item.location.roomName}`;
        uniqueLocations.add(locationString);
      }
    });
    return Array.from(uniqueLocations).sort();
  }, [equipment]);

  // Filter and sort equipment
  const filteredEquipment = useMemo(() => {
    return equipment
      .filter(item => {
        // Apply search term filter
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          (item.equipmentTag?.toLowerCase().includes(searchLower) || 
           item.category?.name.toLowerCase().includes(searchLower) ||
           (item.location && 
            (`${item.location.buildingName}, ${item.location.roomName}`).toLowerCase().includes(searchLower)));
        
        // Apply category filter
        const matchesCategory = 
          filterCategory === 'all' || 
          item.category?.name === filterCategory;
        
        // Apply location filter
        const matchesLocation = 
          filterLocation === 'all' || 
          (item.location && 
           `${item.location.buildingName}, ${item.location.roomName}` === filterLocation);
        
        return matchesSearch && matchesCategory && matchesLocation;
      })
      .sort((a, b) => {
        // Sort by selected field
        if (sortBy === 'tag') {
          return (a.equipmentTag || '').localeCompare(b.equipmentTag || '');
        } else if (sortBy === 'category') {
          return (a.category?.name || '').localeCompare(b.category?.name || '');
        } else if (sortBy === 'location') {
          const locA = a.location ? `${a.location.buildingName}, ${a.location.roomName}` : '';
          const locB = b.location ? `${b.location.buildingName}, ${b.location.roomName}` : '';
          return locA.localeCompare(locB);
        }
        return 0;
      });
  }, [equipment, searchTerm, sortBy, filterCategory, filterLocation]);
  
  // Paginate the results
  const paginatedEquipment = filteredEquipment.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading equipment
        </Typography>
        <Typography>
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </Typography>
      </Box>
    );
  }

  // Show message if no project is selected
  if (!selectedProject) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Please select a project to view and manage equipment.</Alert>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>Go to Dashboard</Button>
      </Box>
    );
  }

  if (equipment.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          No equipment found
        </Typography>
        <Typography component="p" sx={{ mb: 2 }}>
          You need to add equipment before you can create a survey.
        </Typography>
        <Button 
          component={Link} 
          to="/equipment" 
          variant="contained"
        >
          Go to Equipment Page
        </Button>
      </Box>
    );
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleCategoryFilterChange = (event: SelectChangeEvent) => {
    setFilterCategory(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handleLocationFilterChange = (event: SelectChangeEvent) => {
    setFilterLocation(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Render filter controls
  const renderFilterControls = () => (
    <Box sx={{ mb: 3 }}>
      <GridContainer spacing={2}>
        {/* Search Field */}
        <GridItem xs={12} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Equipment"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        
        {/* Sort By Dropdown */}
        <GridItem xs={12} sm={4} md={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              onChange={handleSortChange}
              label="Sort By"
              startAdornment={
                <InputAdornment position="start">
                  <SortIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="tag">Equipment Tag</MenuItem>
              <MenuItem value="category">Category</MenuItem>
              <MenuItem value="location">Location</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        
        {/* Category Filter */}
        <GridItem xs={12} sm={4} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              value={filterCategory}
              onChange={handleCategoryFilterChange}
              label="Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>
        
        {/* Location Filter */}
        <GridItem xs={12} sm={4} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="location-filter-label">Location</InputLabel>
            <Select
              labelId="location-filter-label"
              value={filterLocation}
              onChange={handleLocationFilterChange}
              label="Location"
            >
              <MenuItem value="all">All Locations</MenuItem>
              {locations.map(location => (
                <MenuItem key={location} value={location}>{location}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
      
      {/* Results count */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredEquipment.length} of {equipment.length} equipment items
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Select Equipment for Survey
        </Typography>
        <Typography variant="body1">
          Select the equipment you want to create a survey for. This will take you to the survey creation page for that equipment.
        </Typography>
        
        {/* Mobile filter toggle */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', mt: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />}
            onClick={toggleFilters}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Box>
        
        {/* Filters for mobile (collapsible) */}
        <Box sx={{ display: { xs: showFilters ? 'block' : 'none', md: 'block' } }}>
          {renderFilterControls()}
        </Box>
        
        {/* Filters for desktop (always visible) */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {renderFilterControls()}
        </Box>
      </Paper>

      {filteredEquipment.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No equipment matches your search criteria. Try adjusting your filters.
        </Alert>
      ) : (
        <>
          <GridContainer spacing={3}>
            {paginatedEquipment.map((item) => (
              <GridItem xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  minHeight: '180px' // Ensure consistent card height
                }}>
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    pb: 1, // Reduce bottom padding
                    pt: 2,  // Add top padding
                    px: 2    // Add horizontal padding
                  }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {item.equipmentTag || 'Unnamed Equipment'}
                    </Typography>
                    
                    {item.category && (
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        <strong>Category:</strong> {item.category.name}
                      </Typography>
                    )}
                    
                    {item.location && (
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        fontSize: '0.85rem',
                        mt: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        <strong>Location:</strong> {item.location.buildingName}, {item.location.roomName}
                      </Typography>
                    )}
                  </CardContent>
                  
                  <CardActions sx={{ mt: 'auto', p: 0 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      component={Link} 
                      to={`/equipment/${String(item.id)}/surveys/new`}
                      fullWidth
                      sx={{ 
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        py: 1 // Reduce button padding
                      }}
                    >
                      Create Survey
                    </Button>
                  </CardActions>
                </Card>
              </GridItem>
            ))}
          </GridContainer>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
                siblingCount={1}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default EquipmentSelectionPage;